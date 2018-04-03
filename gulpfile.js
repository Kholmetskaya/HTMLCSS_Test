/*
 * 
 * Определяем переменные 
 *
 */

var gulp = require('gulp'), 
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'), 
    htmlmin = require('gulp-htmlmin'),
    less = require('gulp-less'); 

/*
 * 
 * Создаем задачи (таски) 
 *
 */

// Задача "css". Запускается командой "gulp css"
  gulp.task('css', function(){
	gulp.src(`./assets/styles/*.less`)
        .pipe(less())
        .pipe(autoprefixer('last 2 versions'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('public/css'));
	
});
// Задача "js". Запускается командой "gulp js"
gulp.task('js', function() {
    gulp.src('./assets/js/*') // файлы, которые обрабатываем
        .pipe(uglify()) // минифицируем js
        .pipe(gulp.dest('./public/js/')) // результат пишем по указанному адресу
});

// Задача "images". Запускается командой "gulp images"
gulp.task('images', function() {
   return gulp.src('./assets/images/**/*') // берем любые файлы в папке и ее подпапках
        .pipe(imagemin()) // оптимизируем изображения для веба
        .pipe(gulp.dest('./public/images/')) // результат пишем по указанному адресу

});
// Задача "minify". Запускается командой "gulp minify"
gulp.task('minify', function() {
    return gulp.src('assets/*.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('./public/'));
  });
  gulp.task('font', function() {
    return gulp.src('assets/font/*')
      .pipe(gulp.dest('./public/font/'));
  });

// Задача "watch". Запускается командой "gulp watch"
// Она следит за изменениями файлов и автоматически запускает другие задачи
gulp.task('watch', function () {
	// При изменение файлов *.less в папке "styles" и подпапках запускаем задачу css
	gulp.watch('./assets/styles/**/*.less', ['css']); 
	// При изменение файлов *.js папке "js" и подпапках запускаем задачу js
	gulp.watch('./assets/js/**/*.js', ['js']);
	// При изменение любых файлов в папке "images" и подпапках запускаем задачу images
    gulp.watch('./assets/images/**/*', ['images']);
    // При изменение любых html файлов  запускаем задачу minify
    gulp.watch('./assets/*', ['minify']);
    // При изменение любых шрифтов файлов  запускаем задачу font
    gulp.watch('./assets/font/*', ['font']);
});

