var http = require("http"),
	express = require("express"),
	Promise = require("bluebird");

var __module = {
	provides: ["start"],
	args: [
		"express/log", "config",
		"svc!express/middleware/register"
	]
};

module.exports = function (log, config, registerMiddleware) {
	var self = {};

	self.express = express();
	self.router = express.Router();

	self.start = function () {
		log.info("Configuring express middleware...");
		return registerMiddleware(self.express).then(function () {
			return self.startServer();
		});
	};

	self.startServer = function () {
		log.info("Starting Express app...");
		var deferred = Promise.defer();
		self.express.listen(8080);
		deferred.resolve();
		return deferred.promise;
	};

	return self;
};


module.exports.__module = __module;
