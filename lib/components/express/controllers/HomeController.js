var scattered = {
	provides: {"express/controllers/setup": {after: "*"}},
	args: ["express/controllers/log"]
};


module.exports = function (log) {
	var self = {
		index: function (req, res) {
			res.send("200", "Hello Poseidon!");
		},

		setup: function (app, router) {
			log.info("Initialize Pages controller...");
			app.route("/").get(self.index);
		}
	};

	return self;
};
module.exports.__module = scattered;
