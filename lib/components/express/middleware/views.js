var scattered = {
		provides: "express/middleware/register",
		args: ["express/log", "config"]
	},
	consolidate = require("consolidate");

module.exports = function (log, config) {
	var module = {};


	module.register = function (app) {
		// Set swig as the template engine
		app.engine("server.view.html", consolidate["swig"]);

		// Set views path and view engine
		app.set("view engine", "html");
		app.set("views", "./app/views");
	};

	return module;
};
module.exports.__module = scattered;
