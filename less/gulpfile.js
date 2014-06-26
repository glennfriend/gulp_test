var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('build-less', function() 
{
    gulp.src('./less/bootstrap-normalize.less')
        .pipe(less())
        .pipe(gulp.dest('./css/'));

    // gulp.src('./less/bootstrap-buttons.less')
    //     .pipe(less())
    //     .pipe(gulp.dest('./css/'));

}); 

/* --------------------------------------------------------------------------------
    
-------------------------------------------------------------------------------- */

// develop ENV
gulp.task('develop', function()
{
    console.log( 'dirname = ' + __dirname );
    gulp.run('build-less');
    
    // 監聽文件,一有變化,立刻執行任務
    gulp.watch('./less/*.less', ['build-less']);
});
 

// live ENV
gulp.task('prod', function()
{
    gulp.run('buildlib','build-less','javascripts','stylesheets');
});


gulp.run('develop');
