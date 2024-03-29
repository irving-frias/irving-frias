var gulp              = require('gulp');
var concat            = require('gulp-concat');
var minifycss         = require('gulp-minify-css')
var removeSourcemaps  = require('gulp-remove-sourcemaps');
var rename            = require("gulp-rename");
var sass              = require('gulp-sass')(require('sass'));
var uglify            = require('gulp-uglify');
var w3cValidation     = require('gulp-w3c-html-validation');
var twig              = require('gulp-twig');
var htmlbeautify      = require('gulp-html-beautify');
var deploy            = require('gulp-gh-pages');

// Global options.
var htmlbeautify_options = {
  indent_size: 2,
  indent_char: ' ',
  end_with_newline: true
};

var js_scripts_contrib = [
  './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
];

var js_scripts_custom = [
  './js-src/test.js'
];

gulp.task('sass', function () {
  return gulp.src('./scss/style.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(removeSourcemaps())
    .pipe(rename('irving-frias.css'))
    .pipe(gulp.dest('./css/'));
});

gulp.task('css_min', function () {
  return gulp.src('./css/irving-frias.css')
    .pipe(minifycss())
    .pipe(rename('irving-frias.min.css'))
    .pipe(gulp.dest('./css'));
});

gulp.task('validate-html', function () {
  return gulp.src('./templates/components/*.inc')
    .pipe(w3cValidation({
      generateReport: 'false',
      relaxerror: [
        "The character encoding was not declared. Proceeding using “windows-1252”.",
        "Start tag seen without seeing a doctype first. Expected “<!DOCTYPE html>”.",
        "End tag seen without seeing a doctype first. Expected “<!DOCTYPE html>”",
        "End of file seen without seeing a doctype first. Expected “<!DOCTYPE html>”.",
        "Element “head” is missing a required instance of child element “title”.",
        'Consider adding a “lang” attribute to the “html” start tag to declare the language of this document.',
        'This document appears to be written in '
      ]
    }));
});

gulp.task('watch', function () {
  gulp.watch([
      './scss/*.scss',
      './scss/**/*.scss',
      './templates/*',
      './templates/**/*',
      './js/*.js'
    ], gulp.series(['build-dev']));
});

gulp.task('twig', async function () {
  gulp.src(['./templates/pages/*.html'])
    .pipe(twig())
    .pipe(htmlbeautify(htmlbeautify_options))
    .pipe(gulp.dest('./'));
});

gulp.task('js', function () {
  return gulp.src([...js_scripts_contrib, ...js_scripts_custom])
    .pipe(concat('irving-frias.js'))
    .pipe(removeSourcemaps())
    .pipe(gulp.dest('./js/'));
});
gulp.task('js_min', function () {
  return gulp.src([...js_scripts_contrib, ...js_scripts_custom])
    .pipe(concat('irving-frias.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
});

gulp.task('build', gulp.series([
  'sass',
  'css_min',
  'js',
  'js_min',
  'twig'
]));


/**
 * Push build to gh-pages
 */
gulp.task('deploy', function () {
  return gulp.src("./*")
    .pipe(deploy({
      remoteUrl: "git@github.com:irving-frias/irving-frias.git",
      branch: "main"
    }))
});

gulp.task('default', gulp.series(['watch']));