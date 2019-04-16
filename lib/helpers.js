import {PUBLIC} from "./_config";

/**
 * =Get page data
************************************************************/

import exportMap from "../static/db/export-map.json";

export function getPagesData (regex) {
  const pagesSlugs = Object.keys(exportMap).filter((slug) => {
    return slug.match(regex);
  });

  let pagesData = [];
  pagesSlugs.map((slug) => {
    const data = exportMap[slug];
    pagesData.push({slug, data});
  });

  return pagesData;
}

/**
 * =Image transorms
************************************************************/

export function transformImage (imgSrc, opts = {}) {
  const {w, h} = opts;

  let transform = "";
  if (w && !h) transform = `w=${w}`;
  else if (h && !w) transform = `h=${h}`;
  else transform = `w=${w}&h=${h}`;

  if (!w && !h) return `${PUBLIC.path}${imgSrc}`;
  return `${PUBLIC.path}${imgSrc}&nf_resize=fit&${transform}`
}
