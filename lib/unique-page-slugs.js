const fs = require("fs-extra");
const slugify = require("@sindresorhus/slugify");

const dir = "./content/our-work/categories"

fs.readdir(dir, (err, paths) => {

  paths.map((origSlug) => {
    const pagePath = `${dir}/${origSlug}`;

    fs.readJson(pagePath, (err, data) => {
      const newSuffix = slugify(data.title);
      const creationDate = origSlug.split(/__(.+)/)[0];

      const newSlug = `${creationDate}__${newSuffix}.json`;

      const origLoc = pagePath;
      const newLoc = `./__NEW-FILES__/${newSlug}`

      console.log(origLoc, "=>", newLoc);

      fs.copy(origLoc, newLoc);

    })
  })

})
