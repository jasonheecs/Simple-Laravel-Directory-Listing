/**
 *  Start browsersync task and watch for file changes
 *  Dependencies:
 *   - gulp-watch
 *   - gulp-batch
 */

var gulp = require('gulp');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var config = require('../../config').watch;

gulp.task('watch', ['browsersync'], function() {
    watch(config.platformFiles, batch(function(events, callback) {
        gulp.start('rebuild', callback);
    }));

    watch(config.sass, batch(function(events, callback) {
        gulp.start('sass', callback);
        gulp.start('scsslint', callback);
    }));

    watch(config.scripts, batch(function(events, callback) {
        // gulp.start('scripts', callback);
        gulp.start('concat-js', callback);
        gulp.start('jshint', callback);
    }));

    watch(config.sprites, function() {
        gulp.start('sprites');
    });
});