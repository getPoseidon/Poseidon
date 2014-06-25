var _ = require("lodash"),
	path = require("path"),
	fs = require("fs"),
	stripJson = require("strip-json-comments");


function loadConfigFile(configDir, fileName) {
	var textLoaded = fs.readFileSync(path.resolve(configDir, fileName + ".json"), 'utf-8');
	return JSON.parse(stripJson(textLoaded));
}

/**
 *
 * @param config
 * @constructor
 */
function Config(config) {
	this.config = config || {};
	this.data = null;

	/*
	 laoding configuration files
	 */
	this.load();
}

/**
 *
 */
Config.prototype.load = function () {
	var self = this,
		defaultConfig = {},
		envConfig = {},
		appRoot = self.config.appRoot || process.cwd(),
		configDir = path.resolve(appRoot, self.config.configDir || 'config'),
		defaultFileName = self.config.defaultFileName || "default",
		env = self.config.env || "development";

	try {
		defaultConfig = loadConfigFile(configDir, defaultFileName);
		envConfig = loadConfigFile(configDir, env);
		this.data = _.merge(defaultConfig, envConfig);
	} catch (err) {
		throw new Error("Failed to laod configuration. Caused by: \n" + err.stack);
	}
};


Config.prototype.get = function (key) {
	return key ? this.data[key] : this.data;
};

module.exports = Config;
