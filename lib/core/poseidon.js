var Config = require('./config/config'),
	Logger = require('./log/log'),
	Scatter = require('scatter');

function detectEnvironment() {
	return process.env.NODE_ENV || "development";
}

function Poseidon() {
	this.config = new Config({
		env: detectEnvironment()
	});
	this.logger = new Logger(this.config);
	this.container = new Scatter();

	//register core modules
	this.container.registerModuleInstance('config', this.config);
	this.container.registerModuleInstance('log', this.defaultLogger);
}

Poseidon.prototype.bootstrap = function () {
	return this.container.initializeAll.apply(this.container, arguments);
};

Poseidon.prototype.run = function () {
	var self = this;
	self.logger.info("About to run Poseidon");
	return self.bootstrap()
		.then(function () {
			self.logger.info("done");
		})
		.otherwise(function (err) {
			self.logger.error({
				err: err
			}, "Failed to run Poseidon");
			throw err;
		});
};


module.exports = Poseidon;
