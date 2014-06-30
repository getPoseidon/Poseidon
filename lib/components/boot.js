var __module = {
	provides: ["goPoseidon"],
	args: [
		"log", "config"
	]
};

module.exports = function (log, config) {
	var self = {};

	self.goPoseidon = function () {
		log.info("Poseidon is initializing in " + config.env);
	};

	return self;
};


module.exports.__module = __module;