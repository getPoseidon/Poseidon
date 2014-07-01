var path = require("path"),
	fs = require("fs");

var self = module.exports = {
	__module: {
		properties: {
			log: "express/log",
			config: "config"
		},
		provides: {
			"express/middleware/register": ["express/middleware/router"]
		}
	},

	register: function (app) {
		app.use(function (err, req, res, next) {
			self.log.error({err: err, req: req}, "There was an error while handling the request");
			var status = err.status || 500;
			res.status(status);

			res.format({
				text: function () {
					res.send("hey we got an error");
				},

				html: function () {
					res.send("hey we got an error");
				},

				json: function () {
					res.send({ message: "hey we got an error" });
				}
			});
		});
	}
};