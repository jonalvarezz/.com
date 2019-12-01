"use strict";

const { src, dest, series, watch } = require("gulp");
const $ = require("gulp-load-plugins")();
const nib = require("nib");
const through = require("through");
const isDev = process.argv.indexOf("watch") !== -1;
const wintersmith = require("run-wintersmith");
const PORT = 8080;
const baseDir = "./contents/";

wintersmith.settings.port = PORT;

function styles(cb) {
  return src(baseDir + "stylus/main.styl")
    .pipe(!isDev ? through() : $.plumber())
    .pipe($.sourcemaps.init())
    .pipe(
      $.stylus({
        use: nib()
      })
    )
    .pipe(!isDev ? $.minifyCss() : through())
    .pipe($.sourcemaps.write())
    .pipe(dest(baseDir + "css/"));
}

const html = wintersmith.build;

function dev() {
  watch([baseDir + "stylus/**/*.styl"], styles);
  wintersmith.preview();
}

const build = series(styles, html);

function upload() {
  return src("./build/**/*").pipe($.ghPages());
}

const deploy = series(build, upload);

exports.dev = dev;
exports.build = build;
