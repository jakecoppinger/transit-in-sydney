/*
Gulpfile.js file for the tutorial:
Using Gulp, SASS and Browser-Sync for your front end web development - DESIGNfromWITHIN
http://designfromwithin.com/blog/gulp-sass-browser-sync-front-end-dev

Steps:

1. Install gulp globally:
npm install --global gulp

2. Type the following after navigating in your project folder:
npm install gulp gulp-util gulp-sass gulp-uglify gulp-rename gulp-minify-css gulp-notify gulp-concat gulp-plumber browser-sync --save-dev

3. Move this file in your project folder

4. Setup your vhosts or just use static server (see 'Prepare Browser-sync for localhost' below)

5. Type 'Gulp' and ster developing
*/

/* Needed gulp config */
var gulp = require('gulp');  
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

/* Scripts task */
gulp.task('scripts', function() {
  return gulp.src([
    /* Add your JS files here, they will be combined in this order */
    'js/vendor/jquery-1.11.1.js',
    'js/app.js'
    ])
    .pipe(gulp.dest('dist/js'))
    //.pipe(rename({suffix: '.min'}))
    //.pipe(uglify())
    //.pipe(gulp.dest('dist/js'));
});


// Uglify & Lint JavaScript
gulp.task('js', function() {
    var outputPath = 'js';
    return gulp.src([
        'source/js/**/*.js'
    ])

    //.pipe($.jshint())
        //.pipe($.jshint.reporter('jshint-stylish'))
        .pipe(ngAnnotate()) // Fixes angularjs dependency injection
        .pipe($.uglify({
            preserveComments: false
        }))
        .pipe(gulp.dest('dist/' + outputPath))
});


// /* Sass task */
// gulp.task('sass', function () {  
//     gulp.src('source/scss/style.scss')
//     .pipe(gulp.dest('dist/css'))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(minifycss())
//     .pipe(gulp.dest('dist/css'))
//     /* Reload the browser CSS after every change */
//     .pipe(reload({stream:true}));
// });

/* Reload task */
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "source/"
        }
    });
});

/* Watch scss, js and html files, doing different things with each. */
gulp.task('default', ['browser-sync'], function () {
    /* Watch scss, run the sass task on change. */
    // gulp.watch(['source/scss/*.scss', 'source/**/*.scss'], ['sass'])
    /* Watch app.js file, run the scripts task on change. */
    gulp.watch(['source/js/app.js'], ['scripts'])
    /* Watch .html files, run the bs-reload task on change. */
    gulp.watch(['source/*.html'], ['bs-reload']);
});