var gulp = require('gulp')

var sass = require('gulp-sass')
var rename = require('gulp-rename')

var browserify = require('browserify')
var babel = require('babelify')
var source = require('vinyl-source-stream')

gulp.task('styles', function () {
  return gulp.src('./*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('chat.css'))
    .pipe(gulp.dest('public'))
})

gulp.task('scripts', function () {
  browserify('./lib/index.js')
    .transform(babel)
    .bundle()
    .pipe(source('index.js'))
    .pipe(rename('chat.js'))
    .pipe(gulp.dest('public'))
})

gulp.task('default', [ 'styles', 'scripts' ])
