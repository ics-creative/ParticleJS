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

gulp.task('concat', function() {
  gulp.src(['particle-system.js.tmp', 'asset-shapes.js'])
    .pipe(concat('particle-system.js.concat'))
    .pipe(gulp.dest('./'));
});


gulp.task("uglify", shell.task([
      "uglifyjs --compress --mangle -- particle-system.js.concat > libs/particle-system.js"
    ])
);


gulp.task("build-particle-system", shell.task([
    "tsc -p src --module 'commonjs'",
    "browserify src/particle-bundle.js > particle-system.js.tmp"
  ])
);

gulp.task('clean-tmp', function(cb) {
  del(['particle-system.js.tmp', 'particle-system.js.concat'], cb);
});

gulp.task("start", function () {
  return runSequence("build-particle-system","concat", "uglify", "clean-tmp");
});

/**
 "install": "typings install",
 "start": "npm run build-particle-system ; npm run uglify;npm run clear-tmp",
 "sync": "lite-server & watch 'npm run build-particle-system' src",
 "clear-tmp": "rm particle-system.js.tmp",
 "copyfile": "cp ../core/libs/asset-shapes.js asset-shapes.js",
 "uglify": "uglifyjs --compress --mangle -- particle-system.js.tmp > libs/particle-system.js",
 "build-particle-system": "browserify src/particle-bundle.ts -p [ tsify --noImplicitAny --target 'es5'] --outDir 'tmp' > particle-system.js.tmp"
 */