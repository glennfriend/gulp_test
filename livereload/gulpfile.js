var gulp        = require('gulp');
var connect     = require('gulp-connect');

// listen
gulp.task('connect', function()
{
    connect.server({
        root: '',
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./public/*.html')
        .pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src('./public/*.css')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['*.*'], ['html']);
    gulp.watch(['*.*'], ['css']);
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

