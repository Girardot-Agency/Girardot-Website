const crypto = require("crypto");
const path = require("path");
const fs = require("fs-extra");

const {DIR, ASSET} = require("../lib/_config")

/* =Errors
============================================================================*/

const ERR = {
  noCache: {
    reason: "no-cache",
    msg: "No cache directory detected. Copying source 'uploads' directly to 'static/uploads'.",
    data: "" // Receives source data to pass to 'catch' block.
  },
  noNewFiles: {
    reason: "no-new-files",
    msg: "No new files to upload. Copying cached uploads to 'static/uploads'."
  }
}

/* =Build media promise chain
============================================================================*/

const beginMsg = `
============================================================
 * START: Building media *
============================================================`;

const endMsg = `
============================================================
 * END: Building media *
============================================================`;

// [1]. Get media files.
getMediaFiles()

  // [2]. Hash manifest data promises.
  .then((fileNames) => {
    console.log("", "[Complete!]");
    console.log("\n", "Building source hash manifest data...",
      "\n------------------------------------------------------------");

    return Promise.all(buildSrcHashManifestData(fileNames));
  })

  // [3]. Create hash manifest file.
  .then((srcManifestData) => {
    console.log("", "[Complete!]");
    console.log("\n", "Updating source hash manifest file...",
      "\n------------------------------------------------------------");

    return updateSrcHashManifestFile(srcManifestData);
  })

  // [4]. Build cache directory (& check cache hash manifest).
  .then((srcManifestData) => {
    console.log("", "[Complete!]");
    console.log("\n", "Building cache directory...",
      "\n------------------------------------------------------------");

    return Promise.all([srcManifestData, buildCache(srcManifestData)]);
  })

  // [5]. Filter new files to upload.
  .then((srcAndCacheManifestData) => {
    console.log("", "[Complete!]");
    console.log("\n", "Filtering new files to upload...",
      "\n------------------------------------------------------------");

    return filterNewFilesToUpload(
      srcAndCacheManifestData[0], // Source data
      srcAndCacheManifestData[1] // Cache data
    );
  })

  // [6]. Upload new files to cache.
  .then((newFilesManifestData) => {
    console.log("", "[Complete!]");
    console.log("\n", "Uploading new files to cache...",
      "\n------------------------------------------------------------");

    return Promise.all(uploadNewFiles(newFilesManifestData));
  })

  // [7]. Copy source hash manifest to cache.
  .then((newFilesUploaded) => {
    console.log("", "[Complete!]");
    console.log("\n", "Copying source hash manifest to cache...",
      "\n------------------------------------------------------------");

    const src = path.resolve(ASSET.hashManifestSrc)
    const dest = path.resolve(ASSET.hashManifestCache)

    return copyPath({src, dest, promise: true});
  })

  // [8]. Copy cached uploads to site root @ 'uploads' directory.
  .then(() => {
    const src = path.resolve(DIR.cacheUploads)
    const dest = path.resolve(DIR.staticUploads)

    return copyPath({src, dest, promise: true});
  })

  // [9]. Rejections.
  .catch((err) => {
    console.log("", "[Interrupted!]");

    if (err.reason) {

      /**
       * No cache detected, so copy source files
       * directly to 'static/uploads'. */
      if (err.reason === ERR.noCache.reason) {
        console.log("\n-->", ERR.noCache.msg, "\n");

        return copyPath({
          src: DIR.uploads,
          dest: DIR.staticUploads,
          promise: true
        });
      }

      /**
       * No new files to upload so simply ensure cache
       * files are copied to NextJs static directory. */
      else if (err.reason === ERR.noNewFiles.reason) {
        console.log("\n-->", ERR.noNewFiles.msg);

        const src = path.resolve(DIR.cacheUploads)
        const dest = path.resolve(DIR.staticUploads)

        return copyPath({src, dest, promise: true});
      }
    } else {
      console.log(err);
    }
  })

  // [10]. End.
  .then(() => {
    console.log(endMsg);
  });

/* =1. Get media files
============================================================================*/

function getMediaFiles () {
  console.log(beginMsg);

  return new Promise ((resolve, reject) => {
    fs.readdir(DIR.uploads, (err, files) => {
      if (err) reject(err);

      console.log("\n Crawling source 'uploads'...",
        "\n------------------------------------------------------------");

      files = files.filter((file) => !file.match(/^\./)); // Ignore dot files
      resolve(files);
    });
  });
}

/**
 * =2. Source hash manifest data promises
 *
 * Map files, then...
 * Create file hash data object.
============================================================================*/

function buildSrcHashManifestData (files) {
  const promises = [];

  files.map((file) => {
    const promise = new Promise ((resolve, reject) => {
      buildSrcFileDataObj(file, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });

    promises.push(promise);
  })

  return promises;
}

function buildSrcFileDataObj (file, cb) {
  const filePath = path.resolve(DIR.uploads, file);
  const pathAttrs = path.parse(filePath);

  fs.readFile(filePath, (err, buffer) => {
    if (err) return cb(err, false);

    const ext = pathAttrs.ext;
    const hash = crypto.createHash("md5").update(file + buffer).digest("hex");
    const hashedFileName = `${pathAttrs.name}${pathAttrs.ext}?v=${hash}`;

    const fileManifestData = {
      file,
      ext,
      hash,
      hashedFileName
    };

    return cb(err, fileManifestData)
  });
}

/* Update source hash manifest file
============================================================================*/

function updateSrcHashManifestFile (data) {
  return new Promise ((resolve, reject) => {
    fs.writeJson(ASSET.hashManifestSrc, data, (err) => {
      if (err) reject(err);

      resolve(data);
    });
  });
}

/**
 * Build cache directory
 *
 * Check if cache exists, then...
 * Create a cache uploads directory if non-existent, then...
 * Check a hash manifest exists in the cache, then...
 * If doesn't exist: create an empty hash manifest and return data, or...
 * If exists: read contents of hash manifest and return data.
============================================================================*/

function buildCache (srcData) {

  return new Promise ((resolve, reject) => {
    fs.pathExists(DIR.cache, (err, exists) => {
      if (err) reject(err);

      // If cache doesn't exist pass source data (srcData) to error object.
      if (!exists) {
        ERR.noCache.data = srcData
        reject(ERR.noCache)

      } else {
        console.log("--> Cache directory exists.");

        fs.ensureDir(DIR.cacheUploads, (err) => {
          if (err) reject(err);

          console.log("--> Cache 'uploads' directory created (if non-existent).");
          checkCacheHashManifest((err, data) => {
            if (err) reject(err)
            resolve(data);
          });
        });
      }
    });
  });
}

function checkCacheHashManifest (cb) {
  let data = [];

  fs.pathExists(ASSET.hashManifestCache, (err, exists) => {
    if (err) return cb(err, false);

    else if (!exists) {
      fs.outputJson(ASSET.hashManifestCache, data, (err) => {
        if (err) return cb(err, false);

        console.log("--> No hash manifest detected in the cache 'uploads' folder. Empty hash manifest created.");
        return cb(err, data);
      });

    } else {
      fs.readJson(ASSET.hashManifestCache, (err, data) => {
        if (err) return cb(err, false);

        console.log("--> Hash manifest detected in the cache folder.");
        return cb(err, data);
      })
    }
  })
}

/* Filter new files to upload
============================================================================*/

function filterNewFilesToUpload (srcFilesData, cacheFilesData) {
  return new Promise ((resolve, reject) => {

    const filtered = srcFilesData.filter((srcData) => {
      return !cacheFilesData.some((cacheData) => {
        return srcData.hash === cacheData.hash
      })
    })

    if (!Array.isArray(filtered) || !filtered.length) {
      reject(ERR.noNewFiles)
    }

    resolve(filtered);
  });
}

/* Upload new files
============================================================================*/

function uploadNewFiles (manifestData) {
  let promises = [];

  manifestData.map((fileObj) => {
    const promise = new Promise ((resolve, reject) => {
      const src = path.resolve(DIR.uploads, fileObj.file);
      const dest = path.resolve(DIR.cacheUploads, fileObj.file);

      copyPath({src, dest}, (err, result) => {
        if (err) reject(err)

        console.log("--> File hashed & uploaded:\n", result);
        resolve(fileObj);
      })
    });

    promises.push(promise);
  });

  return promises;
}

/* =Copy path
============================================================================*/

function copyPath (opts, cb) {
  const {src, dest, promise = false} = opts;

  if (!promise) {
    fs.copy(src, dest, (err) => {
      if (err) return cb(err, false);
      return cb(err, {src, dest})
    });

  } else {
    return new Promise ((resolve, reject) => {
      fs.copy(src, dest, (err) => {
        if (err) reject(err);
        return resolve({src, dest})
      });
    });
  }
}
