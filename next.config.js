const fs = require("fs-extra");
const path = require("path");

const { ENV, BRANCH, DIR, ASSET } = require("./lib/_config");

const exportMap = require(ASSET.exportMap);

module.exports = {
	webpack: (config, { defaultLoaders }) => {
		console.log("Branch is ::", BRANCH);

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
			let cmsDir = `${DIR.exports}/cms-public`;
			if (BRANCH.preview) cmsDir = `${DIR.exports}/cms-preview`;
			fs.copy(cmsDir, path.resolve(`${DIR.out}/admin`));

			return exportMap;
		}
		return defaultPathMap;
	}
};
