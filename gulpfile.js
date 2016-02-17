var gulp = require("gulp");
var shell = require('gulp-shell');
var runSequence = require('run-sequence');

gulp.task("copy", function () {
  // コピー元フォルダーの指定
  gulp.src("../core/libs/asset-shapes.js")
    // コピー先フォルダーの指定
    .pipe(gulp.dest("examples/"));
});

gulp.task("default", ["copy"]);


gulp.task("uglify", shell.task([
      "uglifyjs --compress --mangle -- particle-system.js.tmp > libs/particle-system.js"
    ])
);

gulp.task("build-particle-system", shell.task([
      "browserify src/particle-bundle.ts -p [ tsify --noImplicitAny --target 'es5'] --outDir 'tmp' > particle-system.js.tmp"
    ])
);

gulp.task("clear-tmp", function () {
    return shell.task([
      "rm particle-system.js.tmp"]
    );
  }
);

gulp.task("start", function () {
  return runSequence("build-particle-system", "uglify", "clear-tmp");
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