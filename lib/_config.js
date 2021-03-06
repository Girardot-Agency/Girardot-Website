const appRoot = require("app-root-path").path;
const path = require("path");

const ENV = {
	dev: process.env.NODE_ENV === "development",
	prod: process.env.NODE_ENV === "production"
};

const BRANCH = {
	public: process.env.DEPLOY_BRANCH === "public",
	preview: process.env.DEPLOY_BRANCH === "preview"
};

const DIR = {
	// Core - do not change!
	lib: `${appRoot}/lib`,

	// NextJS - do not change!
	build: `${appRoot}/.next`,
	out: `${appRoot}/_out`,
	pages: `${appRoot}/pages`,
	static: `${appRoot}/static`,
	staticDB: `${appRoot}/static/db`,
	staticUploads: `${appRoot}/static/uploads`,

	// Netlify CMS - do not change!
	content: `${appRoot}/content`,
	uploads: `${appRoot}/uploads`,

	// Exports
	exports: `${appRoot}/exports`,

	// Cache
	cache: ENV.dev ? `${appRoot}/.cache` : "/opt/build/cache",
	cacheUploads: ENV.dev
		? `${appRoot}/.cache/uploads`
		: "/opt/build/cache/uploads"
};

const ASSET = {
	exportMap: path.resolve(DIR.staticDB, "export-map.json"),
	hashManifestSrc: path.resolve(DIR.uploads, ".hash.manifest.json"),
	hashManifestCache: path.resolve(DIR.cacheUploads, ".hash.manifest.json")
};

const PUBLIC = {
	media: "/static/uploads",
	exportMap: `http://localhost:3000/static/db/export-map.json`,
	path: "https://girardot-production.netlify.com"
};

module.exports = {
	ASSET,
	BRANCH,
	DIR,
	ENV,
	PUBLIC
};
