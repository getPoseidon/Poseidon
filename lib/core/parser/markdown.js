var marked = require('marked');

function Markdown(config) {
	this.config = config;
	this.marked = marked;
}

Markdown.prototype.convert = function (markdownString) {
	var that = this;
	return that.marked(markdownString);
}

module.exports = Markdown;