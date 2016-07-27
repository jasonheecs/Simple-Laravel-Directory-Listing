/**
 * Optimise image file sizes
 * Dependencies:
 *  - gulp-imagemin
 *  - gulp-size
 *  - imagemin-pngquant
 *  - imagemin-jpeg-recompress
 */

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var size = require('gulp-size');
var config = require('../../config').optimise.images;

gulp.task('optimise:images', function() {
    var setsLength = config.sets.length;

    var optimiseImage = function(imageSet) {
        //configure plugins for imagemin
        var pluginsConfig = config.plugins;
        var gifPlugin = require(pluginsConfig.gif.name);
        var pngPlugin = require(pluginsConfig.png.name);
        var jpgPlugin = require(pluginsConfig.jpg.name);
        var svgPlugin = require(pluginsConfig.svg.name);
        config.options.use = [gifPlugin(pluginsConfig.gif.options), pngPlugin(pluginsConfig.png.options),jpgPlugin(pluginsConfig.jpg.options), svgPlugin()];

        return gulp.src(imageSet.src)
            .pipe(imagemin(config.options))
            .pipe(size({title: imageSet.title, showFiles:false}))
            .pipe(gulp.dest(imageSet.dest));
    };

    // optimise all image sets
    config.sets.forEach(optimiseImage);
});