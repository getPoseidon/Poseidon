var scattered = {
		provides: {"express/middleware/register": {after: ["express/middleware/preprocessors"]}},
		args: ["express/log", "config"]
	},
	session = require("express-session"),
	MongoStore = require("connect-mongo")({
		session: session
	}),
	mongoose = require("mongoose");

module.exports = function (log, config) {
	var module = {};

	module.register = function (app) {
		mongoose.connect("mongodb://localhost:27017/test");
		mongoose.connection.on("error", function () {
			console.error("MongoDB Connection Error. Make sure MongoDB is running.");
		});
		app.use(session({
			secret: "sadsa",
			saveUninitialized: true,
			resave: true,
			store: new MongoStore({
				url: "mongodb://localhost:27017/test",
				auto_reconnect: true,
			})
		}));
	};

	return module;
};
module.exports.__module = scattered;
