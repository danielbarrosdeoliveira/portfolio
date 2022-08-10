const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();

function copyHtml() {
  return gulp
    .src("./src/index.html")
    .pipe(gulp.dest("./dist/"))
    .pipe(browserSync.stream());
}

function copyAssets() {
  return gulp
    .src("./src/assets/**/*.*")
    .pipe(gulp.dest("./dist/assets/"))
    .on("end", browserSync.reload);
}

function compileSass() {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(
      autoprefixer({
        cascade: true,
      })
    )
    .pipe(gulp.dest("./dist/css/"))
    .pipe(browserSync.stream());
}

function browser() {
  browserSync.init({
    server: {
      baseDir: "./dist/",
    },
  });
}

function watch() {
  gulp.watch("./src/*.html").on("change", copyHtml);
  gulp.watch("./src/scss/**/*.scss", compileSass);
  gulp.watch("./src/assets/**/*.*", copyAssets);
}

exports.compileSass = compileSass;
exports.browser = browser;
exports.watch = watch;

exports.default = gulp.parallel(
  browser,
  copyHtml,
  copyAssets,
  compileSass,
  watch
);

exports.build = gulp.parallel(copyHtml, copyAssets, compileSass);
