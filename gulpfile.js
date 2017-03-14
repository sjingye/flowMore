var gulp = require('gulp');
var fileinclude = require('gulp-file-include');
var sass = require("gulp-sass");
// var htmlmini = require('gulp-minify-html');
// var minifycss = require('gulp-minify-css');
// var uglify = require('gulp-uglify');    //加载js压缩
var babel = require('gulp-babel');


//html模块组件化，压缩
gulp.task('html', function() {
    gulp.src('./src/**.html')
        //fileinclude
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        //htmlmini
        // .pipe(htmlmini())
        .pipe(gulp.dest('./dist'));
});

//sass转为css插件
gulp.task('compile-sass', function () {
    gulp.src('./src/sass/*.scss')
	    .pipe(sass())
	    .pipe(gulp.dest('./dist/css'));
});

//压缩css
/*gulp.task('cssmini',['compile-sass'] ,function () {
    gulp.src(['./dist/css/*.css', '!./dist/css/*.min.css'])  //要压缩的css
        .pipe(minifycss())
        .pipe(gulp.dest('./dist/css'));
});
*/


// 压缩js
gulp.task('scripts', function() {
    gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        // .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

//wacth任务
gulp.task('watch', function () {
   gulp.watch('./src/*.html', ['html']);
   gulp.watch('./src/sass/*.scss', ['compile-sass']);
   gulp.watch('./src/js/*.js', ['scripts']);
});

//默认任务
gulp.task('default', ['watch','html','compile-sass','scripts'],function() {
  // 将你的默认的任务代码放在这
});


