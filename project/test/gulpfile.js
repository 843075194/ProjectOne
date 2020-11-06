/* 
    commonJs规范
    1、require() 将这个模块引入
    2、使用这个模块上的函数
*/

const gulp = require("gulp");

//1、先整理html文件
gulp.task("copy-html",function () {
    return gulp.src("*.html")
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());

  })
//2、整理json,xml文件
gulp.task('data',function () {
    return gulp.src(["*.json","*.xml","!package.json"])
    .pipe(gulp.dest('dist/data'))
    .pipe(connect.reload());

  })
//3、整理images文件
gulp.task('images',function () {
    return gulp.src("images/**/*")
    .pipe(gulp.dest('dist/images'))
    .pipe(connect.reload());

  })
//4、一次性执行多个任务
gulp.task("bulid",['copy-html','data','images'],function () {
  console.log('项目建立成功');
  })

  //5、下载插件整理css文件

  const sass = require('gulp-sass');
  const cleanCSS = require('gulp-clean-css');
  sass.compiler = require('node-sass');
  var rename = require("gulp-rename");
   
  gulp.task('scss', function () {
    return gulp.src('stylesheet/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'))
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(rename(function (path) {
        path.basename += '.min'
        }))
      .pipe(gulp.dest('dist/css'))
      .pipe(connect.reload());
  });

  //6、下载插件，处理js代码
  const uglify = require("gulp-uglify");

  gulp.task("scripts",function () {
    return gulp.src(['*.js','!gulpfile.js'])
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
   })

   //7、设置监听程序
   gulp.task("watch",function () { 
     gulp.watch("*.html",['copy-html']);
     gulp.watch(["*.json","*.xml","!package.json"],['data'])
     gulp.watch("images/**/*",['images'])
     gulp.watch('stylesheet/*.scss',['scss'])
     gulp.watch(['*.js','!gulpfile.js'],['scripts'])
    })

    const connect = require("gulp-connect")
 
    gulp.task('server', function() {
      connect.server({
        root:'dist',
        port:8080,
        livereload:true
      })
    })
    
    gulp.task('default', ['server','watch']);
