var should = require('should'),
	sinon = require('sinon'),
	Markdown = require('../../lib/core/parser/markdown');

describe('Markdown', function () {
	describe('convert', function () {
		var m;
		beforeEach(function () {
			m = new Markdown();
		});

		it('should convert a simple string to markdown',
			function () {
				var converted = m.convert("hello");
				converted.should.be.equal("<p>hello</p>\n");
			});
	});
});
