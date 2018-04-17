const gulp = require("gulp");
const shell = require("gulp-shell");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const del = require("del");
const runSequence = require("run-sequence");

gulp.task("copy", () =>
  // コピー元フォルダーの指定
  gulp
    .src("../core/libs/asset-shapes.js")
    // コピー先フォルダーの指定
    .pipe(gulp.dest("./"))
);

gulp.task("default", ["copy"]);

gulp.task("concat", () =>
  gulp
    .src(["particlejs.js.tmp", "src/asset-shapes.js"])
    .pipe(concat("libs/particlejs.js"))
    .pipe(gulp.dest("./"))
);

gulp.task(
  "uglify",
  shell.task([
    "uglifyjs --compress --mangle -- libs/particlejs.js > libs/particlejs.min.js"
  ])
);

gulp.task(
  "build-particle-system",
  shell.task([
    "tsc -p src --outDir tmp --module commonjs --declaration",
    "browserify tmp/particle-bundle.js > particlejs.js.tmp"
  ])
);

gulp.task("clean-tmp", cb => {
  del(["particlejs.js.tmp", "tmp"], cb);
});

gulp.task("start", () =>
  runSequence("build-particle-system", "concat", "uglify", "clean-tmp")
);

const typedoc = require("gulp-typedoc");

gulp.task("typedoc", () =>
  gulp.src(["libs/particlejs.d.ts"]).pipe(
    typedoc({
      // TypeScript options (see typescript docs)
      module: "commonjs",
      target: "es5",
      includeDeclarations: true,

      // Output options (see typedoc docs)
      out: "./docs",
      json: "tmp/doc.json",
      mode: "modules",

      // TypeDoc options (see typedoc docs)
      name: "ParticleJS",
      theme: "minimal",
      ignoreCompilerErrors: true,
      version: true
    })
  )
);
