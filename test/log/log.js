var expect = require("chai").expect,
	sinon = require('sinon'),
	Logger = require('../../lib/core/log/log');

describe('Log', function () {
	describe('warning', function () {
		var logger,
			spy;
		beforeEach(function () {
			logger = new Logger();
			spy = sinon.spy();
			logger.winston.on("logging", spy);
		});

		it('should log with the right level and the right message', function () {

		});
	});

});
