const gulp = require("gulp");
const sharp = require("gulp-responsive");
const path = require("path");

const IMAGES_FOLDER_URL = path.resolve("public", "images");
const THUMBNAILS_FOLDER_URL = path.resolve("public", "images", "thumbnails");
const NORMALIZED_FOLDER_URL = path.resolve("public", "images", "normalized");

function thumbnailsWebp() {
  return gulp
    .src(`${IMAGES_FOLDER_URL}/*.jpg`)
    .pipe(
      sharp({
        "*.jpg": {
          quality: 100,
          width: 300,
          format: "webp"
        }
      })
    )
    .pipe(gulp.dest(THUMBNAILS_FOLDER_URL));
}

function thumbnailsJpeg() {
  return gulp
    .src(`${IMAGES_FOLDER_URL}/*.jpg`)
    .pipe(
      sharp({
        "*.jpg": {
          quality: 100,
          width: 300
        }
      })
    )
    .pipe(gulp.dest(THUMBNAILS_FOLDER_URL));
}

function reducedSize() {
  return gulp
    .src(`${IMAGES_FOLDER_URL}/*.jpg`)
    .pipe(
      sharp({
        "*.jpg": {
          quality: 75,
          width: 1920,
          height: 1080
        }
      })
    )
    .pipe(gulp.dest(NORMALIZED_FOLDER_URL));
}

exports.normalize = reducedSize;

exports.default = gulp.parallel([thumbnailsWebp, thumbnailsJpeg]);
