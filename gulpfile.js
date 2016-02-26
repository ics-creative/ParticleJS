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
    .pipe(concat('libs/particle-system.js'))
    .pipe(gulp.dest('./'));
});


gulp.task("uglify", shell.task([
    "uglifyjs --compress --mangle -- libs/particle-system.js > libs/effects-particle-system.min.js"
  ])
);


gulp.task("build-particle-system", shell.task([
    "tsc -p src --outDir tmp --module commonjs --declaration",
    "browserify tmp/particle-bundle.js > particle-system.js.tmp"
  ])
);

gulp.task('clean-tmp', function (cb) {
  del(['particle-system.js.tmp', 'tmp'], cb);
});

gulp.task("start", function () {
  return runSequence("build-particle-system", "concat", "uglify", "clean-tmp");
});

var typedoc = require("gulp-typedoc");

gulp.task("typedoc", function () {
  return gulp
    .src(["libs/effects-particle-system.d.ts"])
    .pipe(typedoc({
      // TypeScript options (see typescript docs)
      module: "commonjs",
      target: "es5",
      includeDeclarations: true,

      // Output options (see typedoc docs)
      out: "./docs",
      json: "tmp/doc.json",
      mode: "modules",

      // TypeDoc options (see typedoc docs)
      name: "EffectsParticleSystem",
      theme: "minimal",
      ignoreCompilerErrors: true,
      version: true,
    }))
    ;
});