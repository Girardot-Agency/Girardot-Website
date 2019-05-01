const fs = require("fs-extra");
const klaw = require("klaw");

const {DIR, ASSET} = require("./_config");

/* =Build export map (promise chain)
============================================================================*/

const beginMsg = `
============================================================
 * START: Building export map *
============================================================`;

const endMsg = `
============================================================
 * END: Building export map *
============================================================`;

walkContentDir()
  .then((paths) => {
    console.log(beginMsg);
    return Promise.all(readPages(paths));
  })
  .then((pagesData) => {
    console.log("\n", "Building export map data...",
      "\n------------------------------------------------------------");

    return buildExportMap(pagesData);
  })
  .then((exportMap) => {
    console.log("", "[Complete!]");
    console.log("\n", "Renaming media files with hashes...",
      "\n------------------------------------------------------------");

    return renameMediaFilesWithHash(exportMap);
  })
  .then((exportMap) => {
    console.log("", "[Complete!]");
    console.log("\n", "Building export map JSON file...",
      "\n------------------------------------------------------------");

    return buildExportMapJson(exportMap);
  })
  .then((exportMap) => {
    console.log("", "[Complete!]");
    console.log(endMsg);
  })
  .catch((err) => {
    console.error(err);
  })

/* =Get content paths
============================================================================*/

function walkContentDir () {
  let paths = [];

  return new Promise ((resolve, reject) => {
    klaw(DIR.content)
      .on("data", (i) => paths.push(i.path))
      .on("error", (err, i) => reject(err))
      .on("end", () => resolve(paths));
  });
}

/* =Read pages
============================================================================*/

function readPages (paths) {
  let promises = [];

  paths.map((path) => {
    if (path.match(/\.json/)) {
      const promise = new Promise ((resolve, reject) => {
        fs.readJson(path, (err, pageData) => {
          if (err) reject(err);

          resolve(pageData);
        })
      })

      promises.push(promise);
    }
  });

  return promises;
}

/* =Build export map
============================================================================*/

function buildExportMap (pagesData) {
  let exportMap = {};

  pagesData.map((page) => {
    if (page.layout) {
      if (page.category !== "settings") {

        // Build urls
        let slug, url;
        if (page.index) {
          slug = "index.html"
        } else {
          slug = `${page.customSlug}.html`;
        }
        if (page.category) {
          url = `/${page.category}/${slug}`
        } else {
          url = `/${slug}`;
        }

        // Common page data
        const pageMap = {
          page: `/${page.layout}`,
          query: {
            title: page.title,
            path: url.replace(/\.html$/, "")
          }
        };

        // Common optional fields
        if (page.bannerImage) pageMap.query.bannerImage = page.bannerImage;
        if (page.bannerLogo) pageMap.query.bannerLogo = page.bannerLogo;
        if (page.body) pageMap.query.body = page.body;
        if (page.brand) pageMap.query.brand = page.brand;
        if (page.brandLogo) pageMap.query.brandLogo = page.brandLogo;
        if (page.columnOne) pageMap.query.columnOne = page.columnOne;
        if (page.columnTwo) pageMap.query.columnTwo = page.columnTwo;
        if (page.cardImage) pageMap.query.cardImage = page.cardImage;
        if (page.category) pageMap.query.category = page.category;
        if (page.gallery) pageMap.query.gallery = page.gallery;
        if (page.ourWorkTitle) pageMap.query.ourWorkTitle = page.ourWorkTitle;
        if (page.position) pageMap.query.position = page.position;
        if (page.profileImage) pageMap.query.profileImage = page.profileImage;
        if (page.strap) pageMap.query.strap = page.strap;

        // Relational objects
        if (page.jobsRels) pageMap.query.jobsRels = buildRels({category: "jobs", rels: page.jobsRels});
        if (page.ourPeopleRels) pageMap.query.ourPeopleRels = buildRels({category: "our-people", rels: page.ourPeopleRels});
        if (page.ourWorkCategoryRels) pageMap.query.ourWorkCategoryRels = buildRels({category: "our-work", rels: page.ourWorkCategoryRels});
        if (page.ourWorkRels) pageMap.query.ourWorkRels = buildRels({category: "our-work", rels: page.ourWorkRels});
        if (page.testimonialsRels) pageMap.query.testimonialsRels = buildRels({category: "testimonials", rels: page.testimonialsRels});

        exportMap[url] = pageMap;

        Object.assign({}, exportMap, exportMap[url]);
      }
    }
  });

  return new Promise((resolve, reject) => {
    resolve(exportMap)
  });
}

function buildRels (opts = {}) {
  let {category, rels} = opts;
  let relPaths = [];

  if (Array.isArray(rels) && rels.length) {
    rels.map((relValue) => {
      const path = `/${category}/${relValue}.html`; // relValue = customSlug.

      relPaths.push(path);
    });
    return relPaths;
  }
  return;
}

/* =Rename media files with hashes
============================================================================*/

function renameMediaFilesWithHash (exportMap) {
  const mediaPathRegex = "\\/uploads\\/";
  const markdownMediaRegex = new RegExp(`\\(${mediaPathRegex}(.*?)\\.*\\)`, "g");
  const stringMediaRegex = new RegExp(`${mediaPathRegex}(.*)\\.*`, "g");

  const hashableFields = [{
    type: "body",
    markdown: true
  }, {
    type: "bannerImage",
    markdown: false
  }, {
    type: "cardImage",
    markdown: false
  }, {
    type: "profileImage",
    markdown: false
  }];

  return new Promise ((resolve, reject) => {
    Object.keys(exportMap).map((key) => {
      hashableFields.map((field) => {
        const regex = field.markdown ? markdownMediaRegex : stringMediaRegex

        let content = exportMap[key].query[field.type];
        if (content && content.match(regex)) {
          filterMediaInMarkdownToHash(regex, content, (mediaData) => {
            mediaData.map((data) => {
              content = content.replace(data.file, data.hashedFileName)
            });

            exportMap[key].query[field.type] = content;
          });
        }
      })
    });

    resolve(exportMap)
  });
}

// See: https://stackoverflow.com/a/19913702
function filterMediaInMarkdownToHash (regex, content, cb) {
  const hashManifest = fs.readJsonSync(ASSET.hashManifestSrc);

  let matches, mediaFiles = [];
  while (matches = regex.exec(content)) {
    const mediaFile = matches[1];

    const filtered = hashManifest.filter((fileManifest) => {
      const fileName = fileManifest.file;
      return fileName === mediaFile;
    });

    mediaFiles.push(filtered[0]);
  }

  return cb(mediaFiles);
}

/* =Build export map JSON
============================================================================*/

function buildExportMapJson (exportMap) {
  return new Promise((resolve, reject) => {
    fs.outputJson(ASSET.exportMap, exportMap, (err) => {
      if (err) reject(err);
      resolve(exportMap)
    });
  });
}
