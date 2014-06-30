var marked = require("marked");

function Markdown() {
	this.marked = marked;
}

Markdown.prototype.convert = function (markdownString) {
	return this.marked(markdownString);
};

module.exports = Markdown;

module.exports.__module = {};