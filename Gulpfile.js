const gulp = require('gulp')

const sass = require('gulp-sass')
const rename = require('gulp-rename')

const browserify = require('browserify')
const babel = require('babelify')
const source = require('vinyl-source-stream')

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

gulp.task('sCamera', function () {
  browserify('./lib/camera.js')
    .transform(babel)
    .bundle()
    .pipe(source('camera.js'))
    .pipe(gulp.dest('public'))
})

gulp.task('watch', function () {
  gulp.watch('./*.scss', [ 'styles' ])
  gulp.watch('./lib/*.js', [ 'scripts', 'sCamera' ])
})

gulp.task('default', [ 'styles', 'scripts', 'sCamera', 'watch' ])
