var gulp = require('gulp'), 
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'), 
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify-es').default, 
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    concatCss = require('gulp-concat-css'),
    babel = require('gulp-babel'),
    webpack = require("webpack-stream");



gulp.task('scripts', function() {
  return gulp.src('app/index.js')
    .pipe(webpack({
        watch:true,
            module: {
                loaders: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: [/node_modules/],
                        loader: "babel-loader",
                        query: {
                            presets: ['es2015', 'react']
                        }
                    }
              ]
            },
            output: {
              filename: 'bundle.js'
            }
    }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('app/'))
    .pipe(browserSync.reload({ stream: true }));;
});
      
gulp.task('sass', function() {
    return gulp.src('app/components/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(concatCss("main.css"))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function() {
    browserSync({ 
        server: {
            baseDir: 'app'
        }
    });
});

gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function() {
    gulp.watch('app/components/**/*.scss', ['sass']);
   // gulp.watch('app/components/**/*.js', ['scripts']);
    gulp.watch('app/*.html', browserSync.reload);

});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            // .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['clean', 'img', 'css', 'scripts', 'tmp'], function() {

    var buildCss = gulp.src([
            'app/css/main.min.css',
            'app/css/libs.min.css'
        ])
        .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/pages/*.html')
        .pipe(gulp.dest('dist'));

});

gulp.task('clear', function(callback) {
    return cache.clearAll();
})

gulp.task('default', ['watch']);