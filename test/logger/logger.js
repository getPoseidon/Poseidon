var expect = require("chai").expect,
	fs = require("fs"),
	path = require("path"),
	LoggerFactory = require("../../lib/logger/logger"),
	Config = require("../../lib/config/config");

function getLogger(env, appRoot, configDir) {
	return new LoggerFactory(new Config({
		env: env,
		appRoot: appRoot,
		configDir: configDir
	}));
};

var baseDir = __dirname;

describe("Logger", function () {
	beforeEach(function () {
		fs.unlink(path.join(baseDir, "test.log"));
	});

	describe("LoggerInstance", function () {

		it("should load root logger without errors", function () {
			var logger = getLogger("development", baseDir, "fixtures");
			var instance = logger.create();
			expect(instance.bunyanLogger.fields.name).to.be.equals("poseidon");
		});

		it("should load child logger without errors and with the right component field", function () {
			var logger = getLogger("development", baseDir, "fixtures");
			var instance = logger.create("test");
			expect(instance.bunyanLogger.fields.component).to.be.equals("test");
		});

	});
});



