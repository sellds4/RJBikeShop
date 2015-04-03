var gulp = require('gulp'),
    jade = require('gulp-jade'),
    stylus = require('gulp-stylus'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    jeet = require('jeet'),
    rupture = require('rupture');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('clean', function() {
    return gulp.src('./RJBikeShop/Static')
    .pipe(clean());
});

gulp.task('cleantemplates', function() {
    return gulp.src(['./client/app/partials', './client/app/css', './RJBikeShop/Views/Home/Index.cshtml', './RJBikeShop/Static/app/partials', './RJBikeShop/Static/app/css'])
    .pipe(clean());
});

gulp.task('templates', ['cleantemplates'], function() {
    gulp.src('./client/jade/partials/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./client/app/partials'))
        .pipe(gulp.dest('./RJBikeShop/Static/app/partials'));
    gulp.src('./client/jade/index.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./client/app'))
        .pipe(rename('Index.cshtml'))
        .pipe(gulp.dest('./RJBikeShop/Views/Home'));
    gulp.src('./client/stylus/main.styl')
        .pipe(stylus(
            {
                use: [jeet(), rupture()]
            }
        ))
        .pipe(gulp.dest('./client/app/css'))
        .pipe(gulp.dest('./RJBikeShop/Static/app/css'));
});

gulp.task('appdev', ['clean', 'templates'], function() {
    return gulp.src('./client/app/**/*', {
        base: 'client'
    }).pipe(gulp.dest('./RJBikeShop/Static'));
});
