/**
 *  Generate sprites and css files from PNGs and JPGs
 *  Dependencies:
 *  - gulp.spritesmith
 */

var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var configs = require('../../config').sprites;

gulp.task('sprites', function() {
    for (var key in configs) {
        if (configs.hasOwnProperty(key)) {
            var config = configs[key];
            var spriteData = gulp.src(config.src)
                                .pipe(spritesmith(config.options));

            spriteData.img
                .pipe(gulp.dest(config.dest.image));

            spriteData.css
                .pipe(gulp.dest(config.dest.css));
        }
    }
});