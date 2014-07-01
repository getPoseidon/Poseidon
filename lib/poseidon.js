var Config = require("./config/config"),
	LoggerFactory = require("./logger/logger"),
	Scatter = require("scatter");

function detectEnvironment() {
	return process.env.NODE_ENV || "development";
}

function Poseidon() {
	var self = this;
	self.config = new Config({
		env: detectEnvironment()
	});
	self.loggerFactory = new LoggerFactory(self.config);

	self.defaultLogger = self.loggerFactory.create();
	self.scatterLogger = this.loggerFactory.create("scatter");


	self.container = new Scatter({
		log: self.scatterLogger.log.bind(self.scatterLogger)
	});

	//register core modules
	this.container.registerModuleInstance("config", this.config);
	this.container.registerModuleInstance("log", this.defaultLogger);
	this.container.registerModuleInstance("logger", this.loggerFactory.create.bind(this.loggerFactory));

	//load particle dir
	this.container.registerParticle(__dirname + "/components");
}

Poseidon.prototype.bootstrap = function () {
	return this.container.load.apply(this.container, arguments);
};

Poseidon.prototype.run = function () {
	var self = this;
	self.defaultLogger.info("About to run Poseidon");
	return self.bootstrap("svc!goPoseidon")
		.then(function (start) {
			return start();
		})
		.then(function () {
			self.defaultLogger.info("Poseidon is running ;)");
		})
		.otherwise(function (err) {
			self.defaultLogger.error({
				err: err
			}, "Failed to run Poseidon");
			throw err;
		});
};


module.exports = Poseidon;
