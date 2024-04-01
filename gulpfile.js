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
var shell             = require('gulp-shell');
var i18nExtract       = require('gulp-i18n-extract');
const fs              = require('fs');
const path            = require('path');

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
  './js-src/theme-mode.js',
  './js-src/language-toggle.js'
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


function translate(text, lang) {
  // Define your translations here
  const data = fs.readFileSync('translations.json', 'utf8');
  const translations = JSON.parse(data);

  // Check if translation exists for the given language
  if (translations[text] && translations[text][lang]) {
      return translations[text][lang];
  } else {
      // Return original text if translation not found
      return text;
  }
}

function reverse_url(text, lang) {
  const data = fs.readFileSync('reverse_urls.json', 'utf8');
  const translations = JSON.parse(data);

  // Check if translation exists for the given language
  if (translations[text] && translations[text][lang]) {
    return translations[text][lang];
  } else {
      // Return original text if translation not found
      return text;
  }
}

// Task to compile Twig files with translation
gulp.task('twig', function () {
  return gulp.src(['./templates/pages/en/*.html'])
      .pipe(twig({
          functions: [
              {
                  name: 'translate', // Name of the translation function
                  func: function(text) {
                      return translate(text, 'en'); // Translate to English by default
                  }
              },
              {
                name: 'reverse_url', // Name of the translation function
                func: function(text) {
                    return reverse_url(text, 'en'); // Translate to English
                }
            }
          ]
      }))
      .pipe(htmlbeautify(htmlbeautify_options))
      .pipe(gulp.dest('./dist/'));
});

// Task to compile Twig files with Spanish translation
gulp.task('twig-es', function () {
  return gulp.src(['./templates/pages/es/*.html'])
      .pipe(twig({
          functions: [
              {
                  name: 'translate', // Name of the translation function
                  func: function(text) {
                      return translate(text, 'es'); // Translate to Spanish
                  }
              },
              {
                  name: 'reverse_url', // Name of the translation function
                  func: function(text) {
                      return reverse_url(text, 'es'); // Translate to English
                  }
              }
          ]
      }))
      .pipe(htmlbeautify(htmlbeautify_options))
      .pipe(gulp.dest('./dist/es/'));
});

// Task to compile Twig files for posts
gulp.task('twig-posts', function () {
  return gulp.src('./templates/posts/en/**/**/*.html')
    .pipe(twig({
      functions: [
        {
          name: 'translate', // Name of the translation function
          func: function (text) {
            return translate(text, 'en'); // Translate to English by default
          }
        },
        {
          name: 'reverse_url', // Name of the translation function
          func: function (text) {
            return reverse_url(text, 'en'); // Translate to English
          }
        }
      ]
    }))
    .pipe(htmlbeautify(htmlbeautify_options))
    .pipe(gulp.dest(function(file) {
      // Get the relative path of the source file
      const relativePath = path.relative('./templates/posts/en/', file.path);
      // Split the relative path and select only the first two elements (year and month)
      const [year, month] = relativePath.split(path.sep).slice(0, 2);
      const fileName = path.basename(file.path);
      // Construct the destination path
      const destPath = path.join('./dist/posts/');
      return destPath;
    }));
});

// Task to compile Twig files with translation to Spanish
gulp.task('twig-posts-es', function () {
  return gulp.src('./templates/posts/es/**/**/*.html')
    .pipe(twig({
      functions: [
        {
          name: 'translate', // Name of the translation function
          func: function (text) {
            return translate(text, 'es'); // Translate to English by default
          }
        },
        {
          name: 'reverse_url', // Name of the translation function
          func: function (text) {
            return reverse_url(text, 'es'); // Translate to English
          }
        }
      ]
    }))
    .pipe(htmlbeautify(htmlbeautify_options))
    .pipe(gulp.dest(function(file) {
      // Get the relative path of the source file
      const relativePath = path.relative('./templates/posts/es/', file.path);
      // Split the relative path and select only the first two elements (year and month)
      const [year, month] = relativePath.split(path.sep).slice(0, 2);
      const fileName = path.basename(file.path);
      //const newFileName = path.basename(file.path, '.html') + '-output.html';
      // Construct the destination path
      const destPath = path.join('./dist/es/posts/');
      return destPath;
    }));
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

// Define a Gulp task to run the shell script
gulp.task('run_shell_script', shell.task([
  'sh generate.sh'
]));

gulp.task('copy-assets', function() {
  return gulp.src('assets/**/*') // Select all files and subdirectories in the source folder
    .pipe(gulp.dest('dist/assets')); // Copy to the destination folder
});

gulp.task('copy-css', function() {
  return gulp.src('css/**/*') // Select all files and subdirectories in the source folder
    .pipe(gulp.dest('dist/css')); // Copy to the destination folder
});

gulp.task('copy-js', function() {
  return gulp.src('js/**/*') // Select all files and subdirectories in the source folder
    .pipe(gulp.dest('dist/js')); // Copy to the destination folder
});

gulp.task('copy-htaccess', function() {
  return gulp.src('.htaccess') // Select all files and subdirectories in the source folder
    .pipe(gulp.dest('dist/')); // Copy to the destination folder
});


gulp.task('build', gulp.series([
  'sass',
  'css_min',
  'js',
  'js_min',
  'twig',
  'twig-es',
  'twig-posts',
  'twig-posts-es',
  'copy-assets',
  'copy-css',
  'copy-js',
  'copy-htaccess',
  'run_shell_script',
]));

/**
 * Push build to gh-pages
 */
gulp.task('deploy_gh', function () {
  return gulp.src("./dist/")
    .pipe(deploy({
      remoteUrl: "git@github.com:irving-frias/irving-frias.git",
      branch: "main"
    }))
});

gulp.task('deploy', gulp.series([
  'run_shell_script',
  'deploy_gh'
]));

gulp.task('watch', function () {
  gulp.watch([
      './scss/*.scss',
      './scss/**/*.scss',
      './templates/*',
      './templates/**/*',
      './js-src/*.js'
    ], gulp.series(['build']));
});

gulp.task('default', gulp.series(['watch']));