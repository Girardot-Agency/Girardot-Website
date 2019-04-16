const fs = require("fs-extra");
const path = require("path");

const {ENV, DIR, ASSET} = require("./lib/_config");
const exportMap = require(ASSET.exportMap);

module.exports = {
  webpack: (config, {defaultLoaders}) => {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        defaultLoaders.babel,
        {
          loader: require("styled-jsx/webpack").loader,
          options: {type: "scoped"}
        }
      ]
    });
    return config;
  },
  exportPathMap: (defaultPathMap, buildInfo = {}) => {
    const {dev, dir, outDir, distDir, buildId} = buildInfo;

    if (!dev) {
      fs.copy(DIR.exports, path.resolve(DIR.out));
      return exportMap;
    }
    return defaultPathMap;
  }
}
