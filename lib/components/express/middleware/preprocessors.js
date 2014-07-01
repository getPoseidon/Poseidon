var scattered = {
		provides: {"express/middleware/register": {after: ["express/middleware/views"], before: ["express/middleware/router"]}},
		args: ["express/log"]
	},
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	expressValidator = require("express-validator"),
	cookieParser = require("cookie-parser");

module.exports = function (log) {
	var module = {};

	module.register = function (app) {
		log.info("initializing preprocess middleware");
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({extended: true}));
		app.use(expressValidator());
		app.use(methodOverride());
		app.use(cookieParser());
	};

	return module;
};
module.exports.__module = scattered;
