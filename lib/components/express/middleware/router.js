var scattered = {
		provides: ["express/middleware/register"],
		args: ["express/log", "svc!express/controllers/setup"]
	},
	express = require("express")

module.exports = function (log, setupControllers) {
	var module = {};

	module.register = function (app) {
		return setupControllers(app);
	};

	return module;
};
module.exports.__module = scattered;

