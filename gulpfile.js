var gulp = require('gulp');
var sass = require('gulp-sass');


var browserSync = require('browser-sync');  // Para crear el servidor 
var reload = browserSync.reload; 


var concat = require('gulp-concat');
var browserify = require('gulp-browserify');

var merge = require('merge-stream'); // lib para unir css scss // bootstrap tb 
//var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
// var htmlmin = require('gulp-htmlmin')
var autoprefixer = require('gulp-autoprefixer');

var pug = require('gulp-pug');


 var fuentesJS = [
     'js-main/variables.js',
     'js-main/funciones.js'
 ];


/* PUG --> HTML  */
gulp.task('pug',function(){
    gulp.src('./*.pug')
    .pipe(pug({pretty:true}))
    .pipe(gulp.dest('app/'))
})


// Tarea Sass 
gulp.task('sass', function(){
    var archivosSASS, 
        archivosCSS;

        archivosSASS = gulp.src('scss/app.scss')
            .pipe(autoprefixer())
            .pipe(sass({
                includePaths:['scss']
            }));
            archivosCSS = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css');
            return merge(archivosSASS, archivosCSS)
                .pipe(concat('app.css'))
               // .pipe(cssmin())
                //.pipe(rename({suffix: '.min'}))
                .pipe(gulp.dest('app/css/'))
});


gulp.task('js', function(){
    gulp.src(fuentesJS)
        .pipe(concat('test.js'))
        .pipe(browserify())
       // .pipe(uglify())
       .pipe(gulp.dest('app/js/'))  
        .pipe(reload({stream:true})) // Para q recargue los scripts realTime
});

gulp.task('moverFuentes', function(){
    gulp.src('resources/font/*.{eot,svg,ttf,woff,woff2}')
        .pipe(gulp.dest('app/font'))
});


/* Tarea no necesaria para minificar HTML , ya que trabajaré con PUG
gulp.task('minify', function(){
    return gulp.src('./*.html')
            .pipe(htmlmin({collapseWhitespace:true}))
            .pipe(gulp.dest('app'))

})
*/ 

gulp.task('serve',['sass'] ,function(){
    browserSync.init(['app/css/*.css', 'app/js/*.js','app/*.html'], {
        server:{
            baseDir:'app'
        }
    })
});


gulp.task('watch',['sass','serve','js','moverFuentes',/*'minify'*/], function(){
    gulp.watch(['scss/*.scss'] , ['sass']);
    gulp.watch(['js-main/*.js'] , ['js']);
    gulp.watch(['./**/*.pug'], ['pug']);
    //gulp.watch(['*.html'])
});



// Para que corra las tareas solo usando el comando gulp
gulp.task('default', ['watch']);

