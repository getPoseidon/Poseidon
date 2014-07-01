var self = module.exports = {
	__module: {
		properties: {
			log: "express/log"
		},
		provides: {
			"express/middleware/register": {after: "**"}
		}
	},


	register: function (app) {
		app.use(function (req, res, next) {
			self.log.error({req: req}, "Url not found");
			res.status(404);

			// respond with html page
			if (req.accepts("html")) {
				res.send({ error: "Not found" });
				return;
			}

			// respond with json
			if (req.accepts("json")) {
				res.send({ error: "Not found" });
				return;
			}

			// default to plain-text. send()
			res.type("txt").send("Not found");
		});
	}
};