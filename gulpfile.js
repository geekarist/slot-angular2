var gulp = require('gulp');
var del = require('del');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var traceur = require('gulp-traceur');

var PATHS = {
    src: {
        js: 'src/**/*.js',
        assets: ['src/**/*.html', 'src/**/*.json'],
        less: 'styles/main.less'
    },
    lib: [
        'node_modules/gulp-traceur/node_modules/traceur/bin/traceur-runtime.js',
        'node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.src.js',
        'node_modules/systemjs/lib/extension-register.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/angular2/node_modules/zone.js/dist/zone.js',
        'node_modules/angular2/node_modules/zone.js/dist/long-stack-trace-zone.js',
        'node_modules/less/dist/less.min.js'
    ]
};

gulp.task('clean', function (done) {
    del(['dist'], done);
});

gulp.task('js', function () {
    return gulp.src(PATHS.src.js)
      .pipe(rename({extname: ''})) //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
      .pipe(plumber())
      .pipe(traceur({
          modules: 'instantiate',
          moduleName: true,
          annotations: true,
          types: true,
          memberVariables: true
      }))
      .pipe(rename({extname: '.js'})) //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
      .pipe(gulp.dest('dist'));
});

gulp.task('assets', function () {
    return gulp.src(PATHS.src.assets)
      .pipe(gulp.dest('dist'));
});

gulp.task('libs', ['angular2'], function () {
    var size = require('gulp-size');
    return gulp.src(PATHS.lib)
      .pipe(size({showFiles: true, gzip: true}))
      .pipe(gulp.dest('dist/lib'));
});

gulp.task('angular2', function () {

    var buildConfig = {
        paths: {
            "angular2/*": "node_modules/angular2/es6/prod/*.js",
            "rx": "node_modules/angular2/node_modules/rx/dist/rx.js"
        },
        meta: {
            // auto-detection fails to detect properly
            'rx': {
                format: 'cjs' //https://github.com/systemjs/builder/issues/123
            }
        }
    };

    var Builder = require('systemjs-builder');
    var builder = new Builder(buildConfig);

    return builder.build('angular2/angular2', 'dist/lib/angular2.js', {});
});

gulp.task('serve', ['default'], function () {

    var http = require('http');
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var open = require('open');

    var port = 9000, app;

    gulp.watch(PATHS.src.assets, ['assets']);
    gulp.watch(PATHS.src.js, ['js']);
    gulp.watch(PATHS.src.less, ['styles']);

    app = connect().use(serveStatic(__dirname + '/dist'));  // serve everything that is static
    http.createServer(app).listen(port, function () {
        open('http://localhost:' + port);
    });
});

gulp.task('styles', function () {
    return gulp.src(PATHS.src.less)
      .pipe(gulp.dest('dist'));
});

gulp.task('default', ['js', 'assets', 'libs', 'styles']);
