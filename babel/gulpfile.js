var gulp        = require("gulp"),
    connect     = require('gulp-connect'),
    sourcemaps  = require("gulp-sourcemaps"),
    babel       = require("gulp-babel"),
    concat      = require('gulp-concat');

var public_path = './public';

// listen
gulp.task('connect', function() {
    connect.server({
        root: public_path,
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src( public_path + '/*.html')
        .pipe(connect.reload());
});
gulp.task('js_6to5', function () {
    gulp.src( public_path + '/dist/core.src/*.js')
        .pipe(connect.reload());
});
gulp.task('watch', function () {
    gulp.watch([ public_path + '/*.*'],               ['html',    'compile']);
    gulp.watch([ public_path + '/dist/core.src/*.*'], ['js_6to5', 'compile']);
});

gulp.task('compile', function () {
    return gulp.src( public_path + "/dist/core.src/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest( public_path + "/dist/core"));
});

// --------------------------------------------------------------------------------

gulp.task('default', function() {
    console.log(getBundleName());
    gulp.run('connect','watch','compile');
});

// --------------------------------------------------------------------------------

var getBundleName = function () {
    var version = require('./package.json').version;
    var name = require('./package.json').bundleName;
    return name + '.' + version + '.' + 'js';
};

