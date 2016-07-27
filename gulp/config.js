/*jshint esversion: 6*/

/**
 *  Config file used for gulp tasks
 */

var dev                 = 'public'; // development directory (where website in development with unoptimised assets are located)
var src                 = 'src'; // src directory (where various prebuilt assets are located)

var platform            = 'Wordpress'; // which platform this project is built on. (Joomla / Wordpress / Prestashop)
var tplFolderPath       = '/wp-content/themes/twentysixteen'; // folder path of the active template / theme
var cssFolderPath       = tplFolderPath + 'css/custom/'; // where the css assets are located in the current template
var jsFolderPath        = tplFolderPath + 'js/custom/'; // where the js assets are located in the current template
var imagesFolderPath    = '/wp-content/uploads/'; // main images folder in development directory
var tplImagesFolderPath = tplFolderPath + 'img/'; // images folder path in the current template (used by template css and plugins)

var proxyUrl = 'http://localhost/sample/public';

module.exports = {
    browsersync: {
        development: {
            files: [ // list of files to watch
                dev + cssFolderPath + '*.css',
                dev + jsFolderPath + '*.js',
                dev + '/images/**/*.{jpg,jpeg,png,gif,webp}'
            ],
            notify: {
                styles: { // set notification CSS styles
                    'backgroundColor': '#d11a80',
                    'borderBottomLeftRadius': 0,
                    'fontSize': '13px'
                }
            },
            open: 'local', // decide which URL to open automatically when Browsersync starts. Can be true, local, external, ui, ui-external, tunnel or false
            port: 8000, // use a specific port, default port used by Browsersync is 3000
            proxy: proxyUrl, // proxy an existing vhost
        },
        production: {
            codeSync: false, // Don't send any file-change events to browsers
            files: [ // list of files to watch
            ],
            ghostMode: false, // Clicks, Scrolls & Form inputs on public url will not be mirrored to all others.
            logFileChanges: false, // Don't log file changes
            notify: false, // disable notifications
            open: 'external', // decide which URL to open automatically when Browsersync starts. Can be true, local, external, ui, ui-external, tunnel or false
            port: 9999, // use a specific port, default port used by Browsersync is 3000
            proxy: proxyUrl, // proxy an existing vhost
            reloadDebounce: 10000, // wait for 10 seconds after a reload event before allowing more
            scrollProportionally: false, // disable syncing of viewports to TOP position
            scrollThrottle: 10000, // only send scroll events every 10 seconds
            tunnel: true // Tunnel the Browsersync server through a random Public URL
        }
    },
    sass: {
        src: src + '/sass/**/*.{sass,scss}', // dir where the scss files reside
        dest: dev + cssFolderPath, // dir to output the css file
        options: {
            outputStyle: 'expanded', // CSS output style (nested | expanded | compact | compressed)
            sourceComments: true, // Include debug info in output
            sourceMap: './' // Enable source map
        }
    },
    autoprefixer: {
        browsers: [ // list of supported browsers
            "last 3 versions"
        ],
        cascade: true // use Visual Cascading
    },
    browserify: {
        debug: true, // enable source maps
        extensions: ['.coffee', '.hbs'], // additional file extensions to make optional
        // a separate bundle will be generated for each bundle config below
        bundleConfigs: [
            {
                entries: src + '/js/custom.js',
                dest: dev + jsFolderPath,
                outputName: 'custom.js'
            }
        ]
    },
    concatJs: {
        src: src + '/js/**/*.js',
        dest: dev + jsFolderPath,
        outputName: 'custom.js'
    },
    base64: {
        src: dev + cssFolderPath + '**/*.css', // location of css files to run base64 task on
        dest: dev + cssFolderPath, // dir to output the base64 encoded css files
        options: {
            baseDir: dev + cssFolderPath, // The path specified in this option will be used as the base directory (relative to gulpfile) for absolute image paths
            extensions: ['png', 'jpg', 'jpeg', 'gif', 'svg'], // Process only specified extensions
            maxImageSize: 10 * 1024, // Maximum filesize in bytes for changing image to base64 (10 * 1024 = 10KB)
            debug: false // Disable debug log to console
        }
    },
    watch: {
        platformFiles: determineFilesToWatch(platform), //platform-specific files to watch
        sass: src + '/sass/**/*.{sass,scss}', // sass files to watch
        scripts: src + '/js/**/*.js', // js files to watch
        sprites: src + '/sprites/*.{png,jpg,jpeg}' // sprite images to watch
    },
    scsslint: {
        src: [
            src + '/sass/**/*.{sass,scss}', // dir where scss files are located
            '!' + src + '/sass/_sprites.scss', //ignore generated sprites 
            '!' + src + '/sass/_sprites-jpg.scss'
        ],
        options: {
            bundleExec: false // If your scss_lint gem is installed via bundler, then set this option to true
        }
    },
    jshint: {
        src: src + '/js/**/*.js' // dir where js assets are
    },
    sprites: {
        png: {
            src: src + '/sprites/*.png', // where the sprite icons are located
            dest: {
                css: src + '/sass/', // where to output the sprite scss file
                image: dev + tplImagesFolderPath // where to output the sprite image file
            },
            options: {
                cssName: '_sprites.scss', // filename to save CSS as
                cssFormat: 'css', //  CSS format to use
                cssOpts: { // options to pass through to templater
                    cssSelector: function(item) {
                        //if this is a hover sprite, name it as a hover one (e.g 'home-hover' -> 'home:hover')
                        if (item.name.indexOf('-hover') !== -1) {
                            return '.icon-' + item.name.replace('-hover', ':hover');
                        } else { //otherwise, use name as selector
                            return '.icon-' + item.name;
                        }
                    }
                },
                imgName: 'icon-sprite.png', // filename to save image as
                imgPath: getRelativePath(dev + cssFolderPath, dev + tplImagesFolderPath) + '/icon-sprite.png', // path to use in CSS file referring to image location
            }
        },
        jpg: {
            src: src + '/sprites/*.{jpg,jpeg}', // where the sprite icons are located
            dest: {
                css: src + '/sass/', // where to output the sprite scss file
                image: dev + tplImagesFolderPath // where to output the sprite image file
            },
            options: {
                cssName: '_sprites-jpg.scss', // filename to save CSS as
                cssFormat: 'css', //  CSS format to use
                cssOpts: { // options to pass through to templater
                    cssSelector: function(item) {
                        //if this is a hover sprite, name it as a hover one (e.g 'home-hover' -> 'home:hover')
                        if (item.name.indexOf('-hover') !== -1) {
                            return '.icon-' + item.name.replace('-hover', ':hover');
                        } else { //otherwise, use name as selector
                            return '.icon-' + item.name;
                        }
                    }
                },
                imgName: 'icon-sprite.jpg', // filename to save image as
                imgPath: getRelativePath(dev + cssFolderPath, dev + tplImagesFolderPath) + '/icon-sprite.jpg', // path to use in CSS file referring to image location
            }
        }
    },
    optimise: {
        css : {
            src: dev + cssFolderPath + '**/*.css', // where the unoptimised css files are
            dest: dev + cssFolderPath, // where to output the optimised css files
            options: {
                autoprefixer: false
            }
        },
        js : {
            src: dev + jsFolderPath + '**/*.js', // where the unoptimised js files are
            dest: dev + jsFolderPath // where to output the optimised js files
        },
        images: {
            sets: [ // image sets for optimisation
                {
                    src: dev + imagesFolderPath + '**/*.{jpg,jpeg,png,gif,svg}',
                    dest: dev + imagesFolderPath,
                    title: 'Optimised Images in main images folder'
                },
                {
                    src: dev + tplImagesFolderPath + '**/*.{jpg,jpeg,png,gif,svg}',
                    dest: dev + tplImagesFolderPath,
                    title: 'Optimised Images in template images folder'
                }
            ],
            options: {
                interlaced: true
            },
            plugins: { //imagemin plugins
                png: {
                    name: 'imagemin-pngquant',
                    options: {
                        quality: '70-80',
                        speed: 1
                    }
                },
                jpg: {
                    name: 'imagemin-jpeg-recompress',
                    options: {
                        accurate: true,
                        quality: 'high',
                        progressive: true
                    }
                },
                gif: {
                    name: 'imagemin-gifsicle',
                    options: {
                        optimizationLevel: 3
                    }
                },
                svg: {
                    name: 'imagemin-svgo',
                    options: {}
                }
            }
        }
    },
    zip: {
        src: [
            dev + '/**/*',
            '!' + dev + '/sftp-config.json' // do not include sftp-config.json in zip file
        ],
        dest: getTimestamp() + '.zip'
    },
    ftp: {
        src: dev + '/**/*',
        base: './' + dev,
        options: {
            parallel: 10
        }
    },
    db: {
        export: {
            dest: '/databases/',
            filename: 'db_export_' + getTimestamp() + '.sql'
        },
        import: {
            sshDirRoot: '/var/www/'
        }
    },
    favicon: {
        src: src + '/favicon/favicon.png', // where the base image (in png) is
        dest: dev + imagesFolderPath + 'favicon/', // where to output the favicon images
        path: imagesFolderPath.substring(1) + 'favicon/', // path to prefix in favicon HTML src
        markup: {
            src: src + '/favicon/favicon.html', // where the favicon markup HTML file is
            dest: src + '/favicon'
        },
        dataFile: src + '/favicon/faviconData.json', // where the favicon data file is
        settings: {
            windowsBgColor: '#da532c', // favicon bg color on Windows Metro UI
            chromeThemeColor: '#ffffff', // favicon theme color on Android Chrome
            androidManifestName: 'Website', // project manifest name
            safariPinnedColor: '#5bbad5' // favicon pinned color on Safari
        }
    }
};

/**
 * Function to compare dynamically two paths in the same domain and get the relative path between them
 * Refer to https://github.com/nodejs/node-v0.x-archive/blob/master/lib/path.js
 * @param  {string} from - from this absolute path
 * @param  {string} to - to this absolute path
 * @return {string} - Relative path between the 2 absolute paths (no trailing slash)
 */
function getRelativePath(from, to) {
    function trim(arr) {
      var start = 0;
      for (; start < arr.length; start++) {
        if (arr[start] !== '') break;
      }

      var end = arr.length - 1;
      for (; end >= 0; end--) {
        if (arr[end] !== '') break;
      }

      if (start > end) return [];
      return arr.slice(start, end - start + 1);
    }

    var fromParts = trim(from.split('/'));
    var toParts = trim(to.split('/'));

    var length = Math.min(fromParts.length, toParts.length);
    var samePartsLength = length;
    for (var i = 0; i < length; i++) {
      if (fromParts[i] !== toParts[i]) {
        samePartsLength = i;
        break;
      }
    }

    var outputParts = [];
    for (var j = samePartsLength; j < fromParts.length; j++) {
      outputParts.push('..');
    }

    outputParts = outputParts.concat(toParts.slice(samePartsLength));

    return outputParts.join('/');
}

/**
 * Determines which files to watch for browser reload based on the project's platform
 * @param  {string} platform - Platform this project is built on (Joomla / Wordpress / Prestashop)
 * @return {array} - a list of files to watch
 */
function determineFilesToWatch(platform) {
    const PLATFORM_JOOMLA = 'joomla';
    const PLATFORM_PRESTASHOP = 'prestashop';
    const PLATFORM_WORDPRESS = 'wordpress';

    switch(platform.toLowerCase()) {
        case PLATFORM_JOOMLA:
            return [
                dev + '/administrator/components/**/*.{php,xml}',
                dev + '/administrator/language/overrides/*.ini',
                dev + '/administrator/modules/**/*.{php,xml}',
                dev + '/components/**/*.{php,xml}',
                dev + '/language/overrides/*.ini',
                dev + '/modules/**/*.{php,xml}',
                dev + '/plugins/**/*.{php,xml}',
                dev + tplFolderPath + '**/*.{php,html,xml,json,less}',
            ];

        case PLATFORM_PRESTASHOP:
            return [
                dev + '/js/**/*.js',
                dev + '/modules/**/*.{php,tpl,css,js}',
                dev + '/override/**/*.{php,tpl,css,js}',
                '!' + dev + tplFolderPath + '/cache/**/*',
                '!' + dev + jsFolderPath + '**/*.js',
                dev + tplFolderPath + 'js/**.js',
                dev + tplFolderPath + '/modules/**/*.{php,tpl}',
                dev + tplFolderPath + '/sub/**/*.tpl',
                dev + tplFolderPath + '*.tpl',
            ];

        case PLATFORM_WORDPRESS:
            return [
                dev + tplFolderPath + '**/*.php'
            ];

        default:
            return [
                dev + '/**/*.{php,html}'
            ];
    }
}

/**
 * Generates timestamp to append to file dumps
 * @return {string} timestamp string in the format of yyyy_mm_dd_ms
 */
function getTimestamp() {
    var currentDateTime = new Date();
    var year = currentDateTime.getFullYear();
    var month = currentDateTime.getMonth() + 1;
    var day = currentDateTime.getDate();
    var timestamp = currentDateTime.getTime();

    return year + '_' + month + '_' + day + '_' + timestamp;
}