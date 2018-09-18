var gulp = require("gulp"),
  uglify = require("gulp-uglify"),
  stylus = require("gulp-stylus"),
  connect = require("gulp-connect"),
  htmlmin = require("gulp-htmlmin"),
  babel = require("gulp-babel"),
  plumber = require("gulp-plumber"),
  _root = "dist";

// 启动服务器
gulp.task("server", function(){
  connect.server({
    root : _root,
    livereload : true,
    port: 8030
  });
});

// 压缩JS
gulp.task("js", function(){
  gulp.src("src/js/*.js")
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
});

// 定义 gulp 任务，压缩 HTML
gulp.task("html", function(){
  gulp.src(["src/*.html"])
    .pipe(htmlmin({collapseWhitespace: true, minifyCSS:true, minifyJS:true}))
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
});

// 定义任务，编译 stylus
gulp.task("stylus", function(){
  gulp.src("src/css/*.styl")
    .pipe(plumber())
    .pipe(stylus({outputStyle:"compressed"}))
    .pipe(gulp.dest(_root + "/css"))
    .pipe(connect.reload());
});

// 将图片、库、模拟的假数据复制到 dist 下
gulp.task("images", function(){
  gulp.src("src/images/**/*.*")
    .pipe(gulp.dest("dist/images"));
});
gulp.task("lib", function(){
  gulp.src("src/lib/*.*")
    .pipe(gulp.dest("dist/lib"));
});
gulp.task("mock", function(){
  gulp.src("src/mock/*.*")
    .pipe(gulp.dest("dist/mock"));
});
gulp.task("copyfile", ["images", "mock", "lib"]);

gulp.task("watch", function(){
  gulp.watch(["src/css/*.styl"], ["stylus"]);
  gulp.watch(["src/js/*.js"], ["js"]);
  gulp.watch(["src/*.html"], ["html"]);
});

gulp.task("default", ["html", "js", "stylus", "copyfile", "server", "watch"]);
