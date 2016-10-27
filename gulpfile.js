var gulp = require('gulp'),
	runSequence = require('run-sequence'),
    babel = require('gulp-babel'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass')
    copy = require('gulp-copy'),
    concatCss = require('gulp-concat-css'),
    spritesmith = require('gulp.spritesmith');

var bowerPath = './bower_components/';

var stylePath = {
    src: ['./styles/scss/main.scss'],
    dst: './styles/css',
    watchSrc: '.styles/scss/**/*.scss',
    copySrc: bowerPath + 'font-awesome-sass/assets/fonts/font-awesome/fontawesome-webfont.*'
};

var scriptPath = {
    src: './scripts/**/*.js',
    dst: './build/scripts/',
    dstJs: './build/scripts/**/*.js'
};

// Styles Tasks
gulp.task('sass', function () {
  return gulp.src(stylePath.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(stylePath.dst));
});
 
gulp.task('sass:watch', function () {
  return gulp.watch(stylePath.watchSrc, ['sass']);
});

gulp.task('copy', function () {
	return gulp.src(stylePath.copySrc)
  	.pipe(copy('./styles/fonts/font-awesome', {prefix: 5}).on('error', sass.logError));
});

gulp.task('concatCss', function () {
  return gulp.src(['./styles/css/main.css', './bower_components/bootstrap/dist/css/bootstrap.min.css'])
    .pipe(concatCss('main.css'))
    .pipe(gulp.dest('./styles/css/'));
});

// Scripts Tasks

gulp.task('babel', function() {
    return gulp.src(scriptPath.src)
        .pipe(babel({
        presets: ['es2015'],
        plugins: ['transform-runtime']
    }))
        .pipe(gulp.dest(scriptPath.dst));
});

gulp.task('browserify', function() {
    return gulp.src(scriptPath.dstJs)
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./build/es5'))
});

gulp.task('concat', function() {
  return gulp.src('./build/es5/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./build/'));
});

// Sprite Tasks

var imgPath = {
    src: './images/png/*.png',
    dst: './images/sprite/png/',
    dstCss: './styles/scss/sprite/'
};

gulp.task('sprite', function () {
  var spriteData = gulp.src(imgPath.src).pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.scss'
  }));
  return spriteData.pipe(gulp.dest(imgPath.dstCss));
});

gulp.task('styles', function(callback) {
  runSequence(['sass', 'copy'], 'concatCss');
});

gulp.task('script', function(callback) {
  runSequence('babel', 'browserify', 'concat');
});

gulp.task('sprites', function(callback) {
  runSequence('sprite', 'styles');
});