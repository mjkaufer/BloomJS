var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');

gulp.task('scripts', function() {
  gulp.src('lib/*.js')
    .pipe(concat('bloom.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'))
});

gulp.task('default', ['scripts'])