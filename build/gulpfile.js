var path = require('path');
var gulp = require('gulp');
var buffer = require('vinyl-buffer');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream');

var spritesmith = require('gulp.spritesmith');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

gulp.task('sprite', function () {
  // Generate our spritesheet
  var spriteData = gulp.src(resolve('src/assets/icons/*.png')).pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.scss',
    imgPath: '../static/sprite.png',
    padding: 10,
    cssTemplate : resolve('src/styles/scss.template.handlebars')
  }));

  // Pipe image stream through image optimizer and onto disk
  var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest( resolve('static') ));

  // Pipe CSS stream through CSS optimizer and onto disk
  var cssStream = spriteData.css
    .pipe(csso())
    .pipe(gulp.dest( resolve('src/styles/theme-default') ));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
});

gulp.task('default', gulp.series('sprite', function() {
  gulp.watch( resolve('src/assets/icons/*.*'), gulp.parallel('sprite') );
}));
