/**
 * Generates favicons using http://realfavicongenerator.net/
 * Dependencies:
 * - gulp-real-favicon
 * - image-size
 * - run-sequence
 */

var fs = require('fs');
var gulp = require('gulp');
var realFavicon = require ('gulp-real-favicon');
var sizeOf = require('image-size');
var runSequence = require('run-sequence');
var notification = require('../../util/notification');
var config = require('../../config').favicon;

// File where the favicon markups are stored
var FAVICON_DATA_FILE = config.dataFile;

gulp.task('favicon', function(callback) {
    runSequence(
        // 'check-for-favicon-update',
        'generate-favicon',
        'inject-favicon-markups',
        callback
    );
});

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
    var dimensions = sizeOf(config.src);

    if (dimensions.width < 260 || dimensions.height < 260) {
        notification.notify('Favicon Too Small',
                            'Your favicon image size is small. Your image should be 260x260 or more for optimal results.');
    }

    realFavicon.generateFavicon({
        masterPicture: config.src,
        dest: config.dest,
        iconsPath: config.path,
        design: {
            ios: {
                pictureAspect: 'noChange',
                assets: {
                    ios6AndPriorIcons: false,
                    ios7AndLaterIcons: false,
                    precomposedIcons: false,
                    declareOnlyDefaultIcon: true
                }
            },
            desktopBrowser: {},
            windows: {
                pictureAspect: 'noChange',
                backgroundColor: config.settings.windowsBgColor,
                onConflict: 'override',
                assets: {
                    windows80Ie10Tile: false,
                    windows10Ie11EdgeTiles: {
                        small: false,
                        medium: true,
                        big: false,
                        rectangle: false
                    }
                }
            },
            androidChrome: {
                pictureAspect: 'noChange',
                themeColor: config.settings.chromeThemeColor,
                manifest: {
                    name: config.settings.androidManifestName,
                    display: 'standalone',
                    orientation: 'notSet',
                    onConflict: 'override',
                    declared: true
                },
                assets: {
                    legacyIcon: false,
                    lowResolutionIcons: false
                }
            },
            safariPinnedTab: {
                pictureAspect: 'silhouette',
                themeColor: config.settings.safariPinnedColor
            }
        },
        settings: {
            compression: 1,
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false
        },
        markupFile: FAVICON_DATA_FILE
    }, function() {
        done();
    });
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function() {
    gulp.src([config.markup.src])
        .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
        .pipe(gulp.dest('src/favicon'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
    var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
    realFavicon.checkForUpdates(currentVersion, function(err) {
        if (err) {
            throw err;
        }
        done();
    });
});