var expect = require("chai").expect,
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
				expect(converted).to.be.equal("<p>hello</p>\n");
			});
	});
});