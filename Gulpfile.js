'use strict';

var serverPort = 2173;

var vendorLibraries = require('./config/vendor-libraries'),
    genVersion = require('./config/genVersion.js'),
    rootFiles = require('./config/utils.js'),
    gulp = require("gulp"), //http://gulpjs.com/
    gutil = require("gulp-util"), //https://github.com/gulpjs/gulp-util
    sass = require("gulp-sass"), //https://www.npmjs.org/package/gulp-sass
    autoprefixer = require('gulp-autoprefixer'), //https://www.npmjs.org/package/gulp-autoprefixer
    cleanCSS = require('gulp-clean-css'), //https://www.npmjs.com/package/gulp-clean-css
    rename = require('gulp-rename'), //https://www.npmjs.org/package/gulp-rename
    sourcemaps = require('gulp-sourcemaps'), //Genera un mapa de referencias para los archivos. 
    path = require('path'), //Es de Node. Concatena.
    merge = require('merge-stream'),
    concat = require('gulp-concat'),
    del = require('del'),
    gpUglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    gulpif = require('gulp-if'),
    browserSync = require('browser-sync').create(),
    ngAnnotate = require('gulp-ng-annotate'),
    ftp = require('vinyl-ftp'),
    swPrecache = require('sw-precache'),
    exec = require('child_process').exec,
    wait = require('gulp-wait'),
    log = gutil.log;


// Folders for assets, development environment and production environment
var FOLDER_ASSETS = 'assets',
    FOLDER_DEV = 'dev',
    FOLDER_BUILD = 'build',
    FOLDER_DIST = 'dist',
    BOWER_COMPONENTS = 'bower_components',
    NPM_COMPONENTS = 'node_modules',
    FIREBASE = 'firebase';

var SRC_SASS_BASE = path.join(FOLDER_ASSETS, 'styles'),
    SRC_IMAGES_BASE = path.join(FOLDER_ASSETS, 'images'),
    SRC_FONTS_BASE = path.join(FOLDER_ASSETS, 'icons'),
    SRC_JAVASCRIPT_BASE = path.join(FOLDER_ASSETS, 'js'),
    SRC_APP_BASE = path.join(FOLDER_ASSETS, 'app'),
    JS_LIBS_ASSETS = path.join(FOLDER_ASSETS, 'libs'),
    SRC_FAVICONS_BASE = path.join(FOLDER_ASSETS, 'favicon');

var SASS_FILES = SRC_SASS_BASE + '/**/*.scss',
    APP_FILES = SRC_APP_BASE + '/**/*',
    APP_HTML_FILES = SRC_APP_BASE + '/**/*.html',
    APP_JS_FILES = SRC_APP_BASE + '/**/*.js',
    JS_EXTERNAL_FILES = SRC_JAVASCRIPT_BASE + '/*.js',
    IMAGES_FILES = SRC_IMAGES_BASE + '/**/*',
    ICON_FILES = SRC_FONTS_BASE + '/**/*',
    ROOT_FILES = rootFiles.getRootFiles(SRC_APP_BASE),
    FAVICONS_FILES = SRC_FAVICONS_BASE + '/**/*',
    JS_LIBS_ASSETS_FILES = JS_LIBS_ASSETS + '/**/*.js';

var DEV_HTML_JS_FILES = [FOLDER_DEV + 'index.html', FOLDER_DEV + '/templates/**/*.html', FOLDER_DEV + '/js/*.js'],
    JS_WATCH = FOLDER_DEV + '/js/**/*.js';


var JS_FILES_EXTERNAL_ORDER = vendorLibraries.getFiles(BOWER_COMPONENTS, NPM_COMPONENTS, JS_LIBS_ASSETS_FILES);

var JS_FILES_APP_ORDER = vendorLibraries.getAppFiles(SRC_APP_BASE, JS_EXTERNAL_FILES);

var ENVIRONMENT = FOLDER_DEV,
    runFirstTime = true;

var uglifyOptions = vendorLibraries.getUglifySettings;

//*************************************    SECCIÓN  Tasks    *************************************

// require('gulp-stats')(gulp);

gulp.task('help', gulp.series(showHelp));

gulp.task("clean", gulp.series(clean));

gulp.task("sass", gulp.series(sassFunction));

gulp.task("copyTemplates", gulp.series(cleanTemplates, copyTemplatesFunction));

gulp.task("copyImg", gulp.series(cleanImg, copyImgFunction));

gulp.task("copyIcons", gulp.series(cleanIcons, copyIconsFunction));

gulp.task('jsConcat', gulp.series(cleanJs, jsConcatFunction));

gulp.task('jsConcatLibs', gulp.series(cleanJsLibs, jsConcatLibsFunction));

gulp.task('copyBower', gulp.series(copyBower));

gulp.task('copyData', gulp.series(cleanData, copyData));

/*gulp.task('dist-version', gulp.series(distVersion));*/

gulp.task('generateServiceWorker', gulp.series(generateServiceWorker));

gulp.task("watch", function(done) {
    gulp.watch(SASS_FILES, gulp.series('sass' /* , generateServiceWorker */ ));
    gulp.watch(APP_HTML_FILES, gulp.series('copyTemplates' /* , generateServiceWorker */ ));
    gulp.watch([APP_JS_FILES, JS_EXTERNAL_FILES], gulp.series("jsConcat" /* , generateServiceWorker */ ));
    gulp.watch(ICON_FILES, gulp.series('copyIcons' /* , generateServiceWorker */ ));
    gulp.watch(IMAGES_FILES, gulp.series("copyImg" /* , generateServiceWorker */ ));
    gulp.watch(ROOT_FILES, gulp.series(copyRootFiles /* , generateServiceWorker */ ));
    /*gulp.watch([JS_WATCH, DEV_HTML_JS_FILES], gulp.series(reload));*/
    return done();
});

gulp.task('connect', gulp.series(copyBower, gulp.parallel(copyTemplatesFunction, copyRootFiles, sassFunction, "jsConcatLibs", 'copyData', "jsConcat", copyImgFunction, copyIconsFunction), connectServer));

gulp.task('deployTasks', gulp.series(copyBower, gulp.parallel(copyTemplatesFunction, copyRootFiles, sassFunction, "jsConcatLibs", 'copyData', "jsConcat", compressImg, copyIconsFunction) /*, runFTP*/ ));

gulp.task('deployTasksRun', gulp.series(copyBower, gulp.parallel(copyTemplatesFunction, copyRootFiles, sassFunction, "jsConcatLibs", 'copyData', "jsConcat", compressImg, copyIconsFunction), connectServer));

//*************************************    SECCIÓN  Functions    *************************************

function clean() {
    return del([ENVIRONMENT]);
};

function setEnvironmentEnv(done) {
    ENVIRONMENT = FOLDER_DEV;
    done();
}

function setEnvironmentProd(done) {
    ENVIRONMENT = FOLDER_BUILD;
    done();
}

function cleanTemplates(done) {
    del([FOLDER_DEV + '/partials']);
    del([FOLDER_DEV + '/index.html']);
    return done();
};

function cleanFirebase() {
    return del([FIREBASE + '/test/public/**/*']);
}

function cleanImg() {
    return del([FOLDER_DEV + '/img']);
};

function cleanIcons(done) {
    del([FOLDER_DEV + '/css/styleIcons.css']);
    del([FOLDER_DEV + '/fonts/*']);
    return done();
};

function cleanJs(done) {
    return del([ENVIRONMENT + '/js/*', '!' + ENVIRONMENT + '/js/min']);
};

function cleanJsLibs(done) {
    return del([ENVIRONMENT + '/js/libs.js']);
};

function cleanData() {
    return del([FOLDER_DEV + '/data']);
}

function distVersion(done) {
    genVersion.version(done);
}

function reload(done) {
    browserSync.reload();
    return done();
}



function generateServiceWorker(done) {
    var configSw = {
        cacheId: 'allFiles-1',
        // If handleFetch is false (i.e. because this is called from generate-service-worker-dev), then
        // the service worker will precache resources but won't actually serve them.
        // This allows you to test precaching behavior without worry about the cache preventing your
        // local changes from being picked up during the development cycle.
        handleFetch: true,
        runtimeCaching: [{
            // See https://github.com/GoogleChrome/sw-toolbox#methods
            urlPattern: '/(.*)',
            handler: 'fastest',
            options: {
                origin: /\.gstatic\.com/,
                cache: {
                    name: 'gstatic',
                    maxEntries: 50
                }
            }
        }, {
            urlPattern: '/(.*)',
            handler: 'fastest',
            // See https://github.com/GoogleChrome/sw-toolbox#options
            options: {
                origin: /\.googleapis\.com$/,
                cache: {
                    name: 'googleapis',
                    maxEntries: 50
                }
            }
        }],
        staticFileGlobs: [
            ENVIRONMENT + '/',
            ENVIRONMENT + '/css/*.css',
            ENVIRONMENT + '/data/**/*.json',
            ENVIRONMENT + '/favicon/*.{png,ico,xml,svg}',
            ENVIRONMENT + '/fonts/*.{svg,ttf,woff}',
            ENVIRONMENT + '/img/*.{jpg,png}',
            ENVIRONMENT + '/js/**/*.js',
            ENVIRONMENT + '/templates/**/*.html',
            ENVIRONMENT + '/index.html',
            ENVIRONMENT + '/manifest.json'
        ],
        stripPrefix: ENVIRONMENT,
        // verbose defaults to false, but for the purposes of this demo, log more.
        verbose: true
    };

    swPrecache.write(path.join(ENVIRONMENT, 'sw-chabasHoy-3.js'), configSw, done);
}


function connectServer(done) {
    browserSync.init({
        open: false,
        port: serverPort,
        server: {
            baseDir: ENVIRONMENT
        },
        ui: {
            port: 2222,
        }
    });

    return done();
    /*
	
	
    	return done();*/
};

function copyData() {
    var favIcon = gulp.src(FAVICONS_FILES)
        .pipe(gulp.dest(ENVIRONMENT + '/favicon')).on('error', gutil.log);
    return merge(favIcon);
};

function copyBuildToFirebase(done) {
    console.log('Copiando archivos a FIREBASE');
    gulp.src(FOLDER_BUILD + '/**/*')
        .pipe(gulp.dest(FIREBASE + '/test/public')).on('error', gutil.log);
    return done();
}

function sassFunction() {
    showComment('Changed SASS File');
    return gulp.src(SRC_SASS_BASE + '/style.scss')
        .pipe(wait(500))
        .pipe(sourcemaps.init())
        .pipe(gulpif(ENVIRONMENT == FOLDER_DEV, sass()))
        .pipe(gulpif(ENVIRONMENT == FOLDER_BUILD, sass({ outputStyle: 'compressed' })))
        .pipe(autoprefixer())
        .pipe(rename('style.css'))
        .pipe(gulpif(ENVIRONMENT == FOLDER_DEV, sourcemaps.write('./maps')))
        .pipe(gulpif(ENVIRONMENT == FOLDER_BUILD, cleanCSS()))
        .pipe(gulp.dest(path.join(ENVIRONMENT, 'css')))
        .pipe(browserSync.stream()).on('error', gutil.log);
};

function copyBower() {
    var jeet = gulp.src('node_modules/jeet/scss/**/*')
        .pipe(gulp.dest(SRC_SASS_BASE + '/libs/jeet'));
    var normalize = gulp.src(BOWER_COMPONENTS + '/normalize-scss/sass/**/*')
        .pipe(gulp.dest(SRC_SASS_BASE + '/libs/normalize/'));
    return merge(jeet, normalize);
};

function copyTemplatesFunction(done) {
    showComment('Copying HTML Files');
    var copyIndex = gulp.src(SRC_APP_BASE + '/index.html') //Copy only index.html file.
        .pipe(gulp.dest(ENVIRONMENT)).on('error', gutil.log);

    var copyFiles = gulp.src([APP_HTML_FILES, '!' + SRC_APP_BASE + '/index.html']) //Copy all files except index.html
        .pipe(gulp.dest(ENVIRONMENT + '/templates/')).on('error', gutil.log);
    return merge(copyIndex, copyFiles);

};

function copyImgFunction() {
    showComment('Copying Images Files');
    return gulp.src(IMAGES_FILES)
        .pipe(gulp.dest(path.join(ENVIRONMENT, 'img'))).on('error', gutil.log);
};

function copyRootFiles() {
    showComment('Copying RootFiles');
    return gulp.src(ROOT_FILES)
        .pipe(gulp.dest(path.join(ENVIRONMENT))).on('error', gutil.log);
};

function compressImg() {
    return gulp.src(SRC_IMAGES_BASE + '/*')
        .pipe(imagemin([imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 })
        ], {}))
        .pipe(gulp.dest(ENVIRONMENT + '/img'));
};

function copyIconsFunction(done) {
    var copyCss = gulp.src(SRC_FONTS_BASE + '/**/*.css')
        .pipe(gulp.dest(path.join(ENVIRONMENT, 'css'))).on('error', gutil.log);

    var copyFonts = gulp.src(SRC_FONTS_BASE + '/fonts/**/*')
        .pipe(gulp.dest(path.join(ENVIRONMENT, 'fonts'))).on('error', gutil.log);
    return merge(copyCss, copyFonts);
};

function jsConcatFunction(done) {
    gulp.src(JS_FILES_APP_ORDER)
        .pipe(gulpif(ENVIRONMENT == FOLDER_DEV, sourcemaps.init()))
        .pipe(concat('script.js')) // concat pulls all our files together before minifying them
        .pipe(ngAnnotate())
        .pipe(gulpif(ENVIRONMENT == FOLDER_DEV, sourcemaps.write('./maps')))
        .pipe(gulpif(ENVIRONMENT == FOLDER_BUILD, gpUglify(uglifyOptions)))
        .pipe(gulp.dest(path.join(ENVIRONMENT, 'js'))).on('error', gutil.log);
    done();
}

function jsConcatLibsFunction(done) {
    var concatLibs = gulp.src(JS_FILES_EXTERNAL_ORDER)
        .pipe(concat('libs.js')) // concat pulls all our files together before minifying them
        .pipe(gpUglify(uglifyOptions))
        .pipe(gulp.dest(path.join(ENVIRONMENT, 'js/min/'))).on('error', gutil.log);
    return merge(concatLibs);
}

function runFTP(done) {
    var conn = ftp.create({
        host: 'files.000webhost.com',
        user: 'chabashoy',
        password: '34023935n',
        parallel: 3,
        log: gutil.log
    });

    var globs = [
        './build/js/*', //Lo agrego porque no carga script.js
        './build/**/*'
    ];

    // using base = '.' will transfer everything to /public_html correctly 
    // turn off buffering in gulp.src for best performance 

    gulp.src(globs, { base: './build', buffer: false })
        .pipe(conn.newer('/public_html')) // only upload newer files 
        .pipe(conn.dest('/public_html'));
    done();
}

function deployFirebase(done) {
    exec('firebase deploy', {
        cwd: 'D:/Nico/Trabajos/2017/serviciosChabas2017/firebase/test/'
    }, function(error, stdout, stderr) {
        console.log(stdout);
    });
    done();
}

//************************************************************************************************


//*************************************    SECCIÓN  util    *************************************

function showComment(string) {
    if (runFirstTime) { return; }
    log('');
    log('------------------------------------------------');
    log(string);
    log('------------------------------------------------');
    return;
}

function onError(err) {
    return log(err);
}

function showHelp(done) {
    runFirstTime = false;
    showComment("I can help you");
    log("");
    log("Run 'gulp' to compile the whole project and start working.");
    log("If you modify an HTML, CSS, Js, different font or image files a task that will process the information will run.");
    log("");
    log("----------------------------------------------------------");
    runFirstTime = true;
    done();
}

function finishMsg(msg) {
    setTimeout(function() {
        showComment(msg);
    }, 100);
}

//*************************************    SECCIÓN  runner    *************************************

gulp.task('default', gulp.series(setEnvironmentEnv, clean, 'connect', 'watch', generateServiceWorker, function runDev() {
    runFirstTime = false;
    finishMsg('YOU CAN START YOUR WORK in http://localhost:' + serverPort + ' GOOD CODE...');
}));

gulp.task('deploy', gulp.series(setEnvironmentProd, clean, 'deployTasks', function runDeploy(done) {
    generateServiceWorker();
    runFirstTime = false;
    finishMsg('IS DEPLOYED in "' + FOLDER_BUILD + '" folder');
    done();
}));


gulp.task('fd', gulp.series(deployFirebase));

gulp.task('dt', gulp.series(setEnvironmentProd, clean, 'deployTasks', generateServiceWorker, cleanFirebase, copyBuildToFirebase, function runDeploy(done) {
    runFirstTime = false;
    finishMsg('DEPLOYING IN FIREBASE...');
    deployFirebase(done);
    return done();
}));

gulp.task('deploy', gulp.series(setEnvironmentProd, clean, 'deployTasks', function runDeploy(done) {
    generateServiceWorker();
    runFirstTime = false;
    finishMsg('IS DEPLOYED in "' + FOLDER_BUILD + '" folder');
    done();
}));

//************************************************************************************


function run(done) {
    exec('@"%SYSTEMDRIVE%\Program Files\Git\bin\bash.exe" --login -i -c "gulp"', {}, function(error, stdout, stderr) {
        console.log(stdout);
    });
    done();
}

gulp.task('run', gulp.series(run));