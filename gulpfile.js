var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename');

gulp.task('compress', function() {
	return gulp.src('lib/*.js')
		.pipe(uglify())
		.pipe(rename(function(path){
			path.extname = ".min.js"
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['compress'])