const gulp = require("gulp");
const shell = require("gulp-shell");
const uglify = require("gulp-uglify");
const del = require("del");
const runSequence = require("run-sequence");

gulp.task(
  "uglify",
  shell.task([
    "uglifyjs --compress --mangle -- libs/particlejs.js > libs/particlejs.min.js"
  ])
);

gulp.task("build-particle-system", shell.task(["webpack"]));

gulp.task("clean-tmp", cb => {
  del(["particlejs.js.tmp", "tmp"], cb);
});

gulp.task("start", () =>
  runSequence("build-particle-system", "uglify", "clean-tmp")
);

const typedoc = require("gulp-typedoc");

gulp.task("typedoc", () =>
  gulp.src(["libs/d.ts/particlejs.d.ts"]).pipe(
    typedoc({
      // TypeScript options (see typescript docs)
      module: "es2015",
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
