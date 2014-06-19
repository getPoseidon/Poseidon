var winston = require('winston');


function Logger(config) {
	this.config = config,
		this.winston = new (winston.Logger)({
			transports: [
				new (winston.transports.Console)(),
				new (winston.transports.File)({ filename: 'somefile.log' })
			]
		});
}

Logger.prototype.info = function (msg) {
	this.winston.log.call(this.winston, 'info', msg);
}

module.exports = Logger;