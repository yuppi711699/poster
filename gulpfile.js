const gulp = require('gulp')
const babel = require('gulp-babel')

gulp.task('default', () =>
  gulp.src('src/example/example.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('src/example/build'))
)
