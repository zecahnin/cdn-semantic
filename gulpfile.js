var
    gulp            = require('./node_modules/gulp'),
    console         = require('better-console'),
    requireDotFile  = require('require-dot-file'),
    urlPrefixer     = require('gulp-css-url-prefixer'),
    gulpsync        = require('gulp-sync')(gulp),
    util            = require("gulp-util"),
    symlink         = require('gulp-symlink'),
    concat          = require("gulp-concat"),
    uglify          = require("gulp-uglify"),
    flatten         = require("gulp-flatten"),
    gulpif          = require('gulp-if'),
    replace         = require('gulp-replace'),
    clean           = require('gulp-clean'),
    cleanDest       = require('gulp-clean-dest'),
    bower           = require('gulp-bower'),
    watch           = require('./semantic/tasks/watch'),
    build           = require('./semantic/tasks/build');
;
var config = {
    paths: {
        javascript: {
            src:  ["./bower_components/jquery/**/jquery.min.js"
                    ,"./bower_components/jquery-ui/jquery-ui.min.js"
                    ,"./bower_components/jquery-ui/ui/i18n/datepicker-pt-BR.js"
                    ,"./bower_components/jspath/*min.js"
                    ,"./bower_components/highcharts/highcharts.js"
                    ,"./bower_components/highcharts/highcharts-3d.js"
                    ,"./bower_components/highcharts/highcharts-more.js"
                    ,"./bower_components/highcharts/modules/drilldown.js"
                    ,"./bower_components/highcharts/modules/funnel.js"
                    ,"./bower_components/highcharts/modules/solid-gauge.js"
                    ,"./bower_components/leaflet/dist/leaflet.js"
                    ,"./semantic/dist/**/*min.js"],
            dest: "./public/vendor/js"
        },
        javascriptmap: {
            src:  ["./bower_components/**/*.min.map"],
            dest: "./public/vendor/js"
        },
        css: {
            src: ["./semantic/dist/semantic.min.css"
                    ,"./bower_components/jquery-ui/themes/base/*min.css"
                    ,"./bower_components/components-font-awesome/**/*min.css"
                    ,"./bower_components/leaflet/dist/leaflet.css"
                ],
            dest: "./public/vendor/css"
        }
    }
};

try {
    // looks for config file across all parent directories
    packageConfig = requireDotFile('package.json');
}
catch(error) {
    if(error.code === 'MODULE_NOT_FOUND') {
        console.error('No package.json config found');
    }
}
//
gulp.task('bower', function() {

    console.info('Update bower modules');
    return bower({ directory: './bower_components' ,cmd: 'update'});

});
gulp.task('build', function() {

    console.info('START build');

    var conditionSemantic = function (file) {
        if (file.path.indexOf("semantic") > -1) {
            return true;
        }
        return false;
    }
    var conditionJqueryUi = function (file) {
        if (file.path.indexOf("jquery-ui") > -1) {
            return true;
        }
        return false;
    }

    console.info('Building Javascript');
    gulp.src(config.paths.javascript.src)
        .pipe(concat("cnd.min.js"))
        .pipe(gulp.dest(config.paths.javascript.dest));

    console.info('Building Javascript MAP');

    gulp.src(config.paths.javascriptmap.src)
        .pipe(flatten())
        .pipe(gulp.dest(config.paths.javascriptmap.dest));

    console.info('Building CSS');

    gulp.src(config.paths.css.src)
        .pipe(cleanDest(config.paths.css.dest))
        .pipe(flatten())
        .pipe(gulpif(conditionSemantic, replace('../themes/', 'themes/')))
        .pipe(gulpif(conditionSemantic, replace('themes/', '/vendor/themes/semantic/')))
        .pipe(gulpif(conditionJqueryUi, replace('../themes/', 'themes/')))
        .pipe(gulpif(conditionJqueryUi, replace('themes/', '/vendor/themes/jquery-ui/')))
        .pipe(urlPrefixer(packageConfig.cdnHost))
        .pipe(concat("cnd.min.css"))
        .pipe(gulp.dest(config.paths.css.dest));


    console.info('Building Fonts');
    gulp.src(['./bower_components/**/fonts/*'])
        .pipe(flatten())
        .pipe(gulp.dest('./public/vendor/fonts'));

    console.info('Building Themes');
    gulp.src(['./semantic/dist/themes/**'])
        .pipe(gulp.dest('./public/vendor/themes/semantic'));

    gulp.src(['./bower_components/jquery-ui/themes/**'])
        .pipe(gulp.dest('./public/vendor/themes/jquery-ui/'));

    console.info('Building Images');
    gulp.src(['./bower_components/leaflet/dist/images/**'])
        .pipe(gulp.dest('./public/vendor/images'))
        .pipe(gulp.dest('./public/vendor/css/images'));
    ;

    return true;

});
gulp.task('clean', function(){
    console.info('START clear');
    gulp.src('./theme.config')
        .pipe(gulp.dest('./semantic/src/'));

    gulp.src('./public/vendor/')
        .pipe(clean({force: true}));
    console.info('FINISH clear');
    return true;
});
gulp.task('watch-ui', watch);
gulp.task('build-ui', build);

//gulp.task('update', ['clean', 'build-ui','bower','build']);
gulp.task('update', gulpsync.sync(['clean', 'build-ui','bower','build']));