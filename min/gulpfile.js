var gulp        = require('gulp');
var rename      = require('gulp-rename'),
    concat      = require('gulp-concat'),
    clean       = require('gulp-clean');

var uglify      = require('gulp-uglify'),
    minifycss   = require('gulp-minify-css'),
    imagemin    = require('gulp-imagemin'),
    pngcrush    = require('imagemin-pngcrush'),
    clean       = require('gulp-clean');

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
            '!./rc/css/_developer.css'
        ])
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./media/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('./media'));
});

// less
gulp.task('build-less', function()
{
    // less to css
});

// 重新壓縮
gulp.task('image-min', function() {
    gulp.src('./rc/album/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('./media'));
});

// clean all files
gulp.task('clean', function()
{
    return gulp.src([
            './media/*.css',
            './media/*.js',
            './media/*.jpg',
            './media/*.jpeg',
            './media/*.png',
        ], {read: false} )
        .pipe(clean({force: true}));
});


/* --------------------------------------------------------------------------------
    
-------------------------------------------------------------------------------- */

// develop ENV
gulp.task('develop', function()
{
    console.log( 'dirname = ' + __dirname );
    gulp.run('js-min','css-min','image-min');
});
 

// live ENV
gulp.task('prod', function()
{
    gulp.run('js-min','css-min');
});


gulp.task('default', ['clean'], function() {
    gulp.run('develop');
});

