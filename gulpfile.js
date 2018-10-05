const gulp = require('gulp');
const rename = require('gulp-rename');
const babel = require('gulp-babel');

// default gulp task
gulp.task('default', () =>
  // for each js file in the javascript folder
  gulp.src('./webapp/javascript/*.js')
    .pipe(babel({
      // transpile ES6 to ES5
      presets: ['@babel/preset-env']
    }))
    .pipe(rename((path) => {
      // add file name suffix .controller to file
      path.basename += '.controller';
    }))
    // save new js file to the controller folder
    .pipe(gulp.dest('./webapp/controller'))
);