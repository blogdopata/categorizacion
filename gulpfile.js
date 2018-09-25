
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer')
var concat = require('gulp-concat');


var fuentesJS = [
    'app/js/variables.js',
    'app/js/myScripts.js'
];

// Tarea Sass 
gulp.task('sass', function(){
    gulp.src('scss/app.scss')
    .pipe(autoprefixer())
        .pipe(sass({
            includePaths: ['scss']
        }))
        .pipe(gulp.dest('app/css'));
});


gulp.task('js', function(){
    gulp.src(fuentesJS)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('app/js'))
});


gulp.task('serve',['sass'] ,function(){
    browserSync.init(['app/css/*.css', 'app/js/*.js','app/*.html'], {
        server:{
            baseDir:'app'
        }
    })

});


gulp.task('watch',['sass','serve','js'], function(){
    gulp.watch(['scss/*.scss'] , ['sass'])
});



// Para que corra las tareas solo usando el comando gulp
gulp.task('default', ['watch']);

