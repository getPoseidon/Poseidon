/*
 this is just to require all source files under lib folder.
 Otherwise we would get 100% of coverage on files not even required
 */
var path = require("path");
require('require-all')({
	dirname: path.join(process.cwd(), "lib")
});
