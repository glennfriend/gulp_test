var gulp = require('gulp');
var uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css');

// 合併, 壓縮, 命名
gulp.task('js-min', function() {
    gulp.src('./rc/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./media/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('./media/'));
});

// 合併, 壓縮, 命名
gulp.task('css-min',['build-less'], function() {
    gulp.src([
         './rc/css/*.css',
        '!./rc/css/_developer.css']
        )
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./media/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('./media'));
});

// less
gulp.task('build-less', function() {
    // less to css
});

/* --------------------------------------------------------------------------------
    
-------------------------------------------------------------------------------- */

// develop ENV
gulp.task('develop', function()
{
    console.log( 'dirname = ' + __dirname );
    gulp.run('js-min','css-min');
});
 

// live ENV
gulp.task('prod', function()
{
    gulp.run('js-min','css-min');
});


gulp.task('default', function() {
    gulp.run('develop');
});

