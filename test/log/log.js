var should = require('should'),
	sinon = require('sinon'),
	Logger = require('../../lib/core/log');

describe('Log', function () {
	describe('root levels', function () {
		var logger;
		var spy;
		beforeEach(function () {
			logger = new Logger();
			spy = sinon.spy();
			logger.winston.on("logging", spy);
		});

		it('should log with the right level and the right message', function () {
			var res = logger.info("ciao");
			spy.callCount.should.be.equal(1);
			spy.args[0][1].should.be.equal("info");
			spy.args[0][2].should.be.equal("ciao");

		});
	});

});
