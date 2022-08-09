const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

function compileSass() {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(
      autoprefixer({
        cascade: true,
      })
    )
    .pipe(gulp.dest("./src/css/"))
    .pipe(browserSync.stream());
}

function browser() {
  browserSync.init({
    server: {
      baseDir: "./src",
    },
  });
}

function watch() {
  gulp.watch("./src/*.html").on("change", browserSync.reload);
  gulp.watch("./src/scss/**/*.scss", compileSass);
}

exports.compileSass = compileSass;
exports.browser = browser;
exports.watch = watch;

exports.default = gulp.parallel(browser, compileSass, watch);
