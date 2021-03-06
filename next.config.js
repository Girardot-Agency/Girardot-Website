const fs = require("fs-extra");
const path = require("path");

const { BRANCH, DIR, ASSET } = require("./lib/_config");

const exportMap = require(ASSET.exportMap);

module.exports = {
	webpack: (config, { defaultLoaders }) => {
		config.module.rules.push({
			test: /\.css$/,
			use: [
				defaultLoaders.babel,
				{
					loader: require("styled-jsx/webpack").loader,
					options: {
						type: "scoped"
					}
				}
			]
		});
		return config;
	},
	exportPathMap: (defaultPathMap, buildInfo = {}) => {
		const { dev, dir, outDir, distDir, buildId } = buildInfo;

		if (!dev) {
			let cmsDir;
			if (BRANCH.preview) cmsDir = `${DIR.exports}/cms-preview`;
			else cmsDir = `${DIR.exports}/cms-public`;

			fs.copy(cmsDir, path.resolve(`${DIR.out}/admin`));

			return exportMap;
		}
		return defaultPathMap;
	}
};
