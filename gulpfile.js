const gulp = require("gulp");
const sharp = require("gulp-responsive");
const path = require("path");

const IMAGES_FOLDER_URL = path.resolve("public", "images");

console.log("path: ", IMAGES_FOLDER_URL);

gulp.task("make:images", () => {
    return gulp
            .src(`${IMAGES_FOLDER_URL}/*.jpg`)
            .pipe(
                sharp({ 
                    "*.jpg": { 
                        quality: 100, 
                        width: 300,
                        format: "webp",
                        rename: { suffix: ".thumb" }
                    } 
                })
            )
            .pipe(gulp.dest(IMAGES_FOLDER_URL));
})