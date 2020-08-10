const { src, dest, series, parallel, watch } = require("gulp");
const sass = require("gulp-sass");
const del = require("del");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const rename = require("gulp-rename");
//const newer = require("gulp-newer");
const modifyHREF = require("gulp-processhtml");
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");

function processHTML() {
  return src("src/*.html").pipe(modifyHREF()).pipe(dest("dist"));
}

function processIMG() {
  return src("src/images/*.+(png|jpg|jpeg|svg|gif)")
    .pipe(
      cache(
        imagemin({
          interlaced: true,
        })
      )
    )
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
    ["src/index.html", "src/sass/*.scss"],
    { ignoreInitial: false },
    series(clean, parallel(processHTML, css, processIMG))
  );
};
