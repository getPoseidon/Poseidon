var scattered = {
		provides: {"express/middleware/register": ["express/middleware/preprocessors"]},
		args: ["express/log"]
	},
	express = require("express"),
	path = require("path");

module.exports = function (log) {
	var module = {};

	module.register = function (app) {
		app.use(express.static(path.resolve("./public")));
	};

	return module;
};

module.exports.__module = scattered;
