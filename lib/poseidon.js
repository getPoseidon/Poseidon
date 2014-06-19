var Config = require('./core/config'),
	Logger = require('./core/log'),
	Scatter = require('scatter')

function Poseidon() {
	this.config = new Config();

	this.logger = new Logger(this.config);

	var self = this;
	this.scatter = new Scatter();

	//register core modules
	this.scatter.registerModuleInstance('config', this.config);
	this.scatter.registerModuleInstance('log', this.defaultLogger);
}

Poseidon.prototype.bootstrap = function () {
	return this.scatter.initializeAll.apply(this.scatter, arguments);
};

Poseidon.prototype.run = function () {
	var self = this;
	self.logger.info("About to run Poseidon");
	return self.bootstrap()
		.then(function () {
			self.logger.info("done");
		})
		.otherwise(function (err) {
			self.scatterLogger.error({
				err: err
			}, "Failed to run Poseidon");
			throw err;
		});
};


module.exports = Poseidon;
