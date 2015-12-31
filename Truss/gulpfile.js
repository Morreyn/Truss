// Using require to include gulp and its dependencies in the gulp.js file

var gulp    = require('gulp'),
    sass    = require('gulp-ruby-sass');


// creating a gulp task to compile the sass file (trussstyle.scss) to trussstyles.css

// using expanded so that the .css file that gets compiled is not compressed

gulp.task('sass', function(){
  return sass('css/truss styles.scss', 
    { style: 'expanded' })
    .pipe(gulp.dest('css/compiledCSS'));
});

// Automatically compile sass as the gulp file watches any change

gulp.task('watch', function(){
  gulp.watch('css/*.scss', ['sass']);
});

// Just run gulp in the terminal once and then this default task will do the automation
// as changes are made to sass files. No need to run (gulp sass or gulp) after this.


gulp.task('default', ['sass', 'watch']);
