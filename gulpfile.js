var gulp = require("gulp");
var shell = require('gulp-shell');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task("copy", function () {
  // コピー元フォルダーの指定
  gulp.src("../core/libs/asset-shapes.js")
    // コピー先フォルダーの指定
    .pipe(gulp.dest("./"));
});

gulp.task("default", ["copy"]);

gulp.task('concat', function () {
  gulp.src(['particle-system.js.tmp', 'asset-shapes.js'])
    .pipe(concat('particle-system.js.concat'))
    .pipe(gulp.dest('./'));
});


gulp.task("uglify", shell.task([
    "uglifyjs --compress --mangle -- particle-system.js.concat > libs/effects-particle-system.min.js"
  ])
);


gulp.task("build-particle-system", shell.task([
    "tsc -p src --outDir tmp --module commonjs",
    "browserify tmp/particle-bundle.js > particle-system.js.tmp"
  ])
);

gulp.task('clean-tmp', function (cb) {
  del(['particle-system.js.tmp', 'particle-system.js.concat', 'tmp'], cb);
});

gulp.task("start", function () {
  return runSequence("build-particle-system", "concat", "uglify", "clean-tmp");
});
