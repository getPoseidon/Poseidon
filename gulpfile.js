var gulp = require("gulp"),
	jshint = require("gulp-jshint"),
	mocha = require("gulp-mocha"),
	istanbul = require("gulp-istanbul");

var lib = "lib/**/*.js",
	test = "test/**/*.js";

var handleError = function (err) {
	console.error(err.stack);
	this.emit("end");
};


gulp.task("jshint", function () {
	return gulp.src("lib/core/config/config.js")
		.pipe(jshint())
		.pipe(jshint.reporter("jshint-stylish"))
		.pipe(jshint.reporter("fail"));
});

gulp.task("watch", function () {
	gulp.watch(lib, ["mocha", "jshint"]);
	gulp.watch(test, ["mocha"]);
});

gulp.task("test", function (cb) {
	gulp.src(["lib/**/*.js", "index.js"])
		.pipe(istanbul()) // Covering files
		.on("finish", function () {
			gulp.src(test)
				.pipe(mocha({
					reporter: "spec",
					ignoreLeaks: true
				})).pipe(istanbul.writeReports({
					reporters: [ "html", "text", "text-summary" ]
				})) // Creating the reports after tests runned
				.on("end", cb);
		});
});
