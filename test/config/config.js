var expect = require("chai").expect,
	Config = require("../../lib/config/config");

function loadConf(env, appRoot, configDir) {
	return new Config({
		env: env,
		appRoot: appRoot,
		configDir: configDir
	})
};

var baseDir = __dirname;

describe("Config", function () {
	describe("load()", function () {

		it("should load config without errors", function () {
			var loaded = loadConf("development", baseDir, "fixtures");
			expect(loaded.data).not.to.be.null;
		});

		it("should throw an error if it can't load the right configuration file based on the current environment", function () {
			var loaded = function () {
				return loadConf("fakeEnvironment", "fakeAppRoot", "fakeConfigFolder");
			};
			expect(loaded).to.throw(/Failed to laod configuration/);
		});

		it("should merge properly properties", function () {
			var loaded = loadConf("development", baseDir, "fixtures");
			expect(loaded.data.toBeOverwritten).to.have.property("newVal");
		});

	});

	describe("get()", function () {
		it("should get the right value given a key", function () {
			var loaded = loadConf("development", baseDir, "fixtures");
			expect(loaded.get("toBeOverwritten")).to.have.property("newVal");
		});

		it("should not fail if a not existing key is given ", function () {
			var loaded = loadConf("development", baseDir, "fixtures");
			expect(loaded.get("notExistingProperty")).to.be.undefined;
		});

		it("should return the whole config object if the key is missing", function () {
			var loaded = loadConf("development", baseDir, "fixtures");
			expect(loaded.get()).to.be.deep.equal(loaded.data);
		});
	});
});



