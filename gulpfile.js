const { src, dest, series, parallel, watch } = require("gulp");
const sass = require("gulp-sass");
const del = require("del");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const rename = require("gulp-rename");
const newer = require("gulp-newer");

function processHTML() {
  return src("src/*.html").pipe(dest("dist"));
}

function processIMG() {
  return src("src/images/*")
    .pipe(newer("dist/images/*"))
    .pipe(dest("dist/images"));
}

function css() {
  return src(["src/sass/*.scss", "!src/sass/breakpoints.scss"])
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("src/css"))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(dest("dist/css"));
}

function clean() {
  return del(["dist", "src/css/*.css"]);
}

/* exports.default = series(clean, css, parallel(processHTML, processMinify)); */

exports.default = function () {
  watch(
    "src/sass/*.scss",
    series(clean, parallel(processHTML, css, processIMG))
  );
};
