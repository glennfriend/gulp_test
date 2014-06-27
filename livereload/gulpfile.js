var gulp        = require('gulp');
var connect     = require('gulp-connect');

var public_path = './public';

// listen
gulp.task('connect', function()
{
    connect.server({
        root: '',
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src( public_path + '/*.html')
        .pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src( public_path + '/*.css')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch([ public_path + '/*.*'], ['html']);
    gulp.watch([ public_path + '/*.*'], ['css']);
});

/* --------------------------------------------------------------------------------
    
-------------------------------------------------------------------------------- */

gulp.task('develop', function()
{
    gulp.run('connect', 'watch');
});

gulp.task('default', function() {
    gulp.run('develop');
});

