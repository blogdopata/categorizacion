
var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('sass', function(){
    gulp.src('scss/app.scss')
        .pipe(sass({
            includePaths: ['scss']
        }))
        .pipe(gulp.dest('app/css'));
})