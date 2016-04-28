// Jake Coppinger 2016

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
var jshint = require('gulp-jshint');
var del = require('del');
var runSequence = require('run-sequence');
var size = require('gulp-size');
var merge = require('merge-stream');
var run = require('gulp-run');

gulp.task('js', function() {
    var outputPath = 'js';
    return gulp.src([
            'source/js/**/*.js'
        ])
        .pipe(uglify({
            preserveComments: false
        }))
        .pipe(gulp.dest('dist/' + outputPath))
});

// Lint JavaScript
gulp.task('lint', function() {
    return gulp.src([
            'source/js/*.js'
        ])
        .pipe(reload({
            stream: true,
            once: true
        }))
        // .pipe(jshint.extract())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('serve', ['lint'], function() {
    browserSync.init({
        server: {
            baseDir: "source/"
        },
        open: false,
        // notify: false,
        logPrefix: 'TransitInSydney'
    });

    /* Watch scss, run the sass task on change. */
    // gulp.watch(['source/scss/*.scss', 'source/**/*.scss'], ['sass'])
    /* Watch app.js file, run the scripts task on change. */
    gulp.watch(['source/js/*.js'], ['lint', reload]);

    gulp.watch(['source/js/libraries/*.js'], [reload]);
    /* Watch .html files, run the bs-reload task on change. */
    gulp.watch(['source/*.html'], [reload]);
});

// Copy All Files At The Root Level (app)
gulp.task('copy', function() {
    var html = gulp.src([
        'source/*',
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));

    var js = gulp.src([
        'js/**/*'
    ]).pipe(gulp.dest('dist/js'));

    return merge(html, js)
        .pipe(size({
            title: 'copy'
        }));
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('build', ['clean'], function(cb) {
    runSequence(
        ['copy', 'js'],
        cb);
});

gulp.task('deploy', function () {
  return run('git subtree push --prefix dist origin gh-pages').exec()
    //.pipe(gulp.dest('output'))    // Writes "Hello World\n" to output/echo. 
})


gulp.task('default', ['serve']);


