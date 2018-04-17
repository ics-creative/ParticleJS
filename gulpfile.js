const gulp = require("gulp");
const shell = require("gulp-shell");
const uglify = require("gulp-uglify");
const runSequence = require("run-sequence");

gulp.task(
  "uglify",
  shell.task([
    "uglifyjs --compress --mangle -- libs/particlejs.js > libs/particlejs.min.js"
  ])
);

gulp.task("build-particle-system", shell.task(["webpack"]));

gulp.task("start", () => runSequence("build-particle-system", "uglify"));

const typedoc = require("gulp-typedoc");

gulp.task("typedoc", () =>
  gulp.src(["src/particlejs.ts"]).pipe(
    typedoc({
      // TypeScript options (see typescript docs)
      module: "umd",
      target: "es5",
      includeDeclarations: false,

      // Output options (see typedoc docs)
      out: "./docs",
      mode: "file",

      // TypeDoc options (see typedoc docs)
      name: "ParticleJS",
      theme: "minimal",
      ignoreCompilerErrors: true,
      version: true
    })
  )
);
