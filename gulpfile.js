var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    jshint = require('gulp-jshint'),
    jshStylish = require('jshint-stylish'),
    concat = require('gulp-concat'),
    insert = require('gulp-insert'),
    documentation = require('gulp-documentation'),
    docTheme = require('documentation-theme-node'),
    coveralls = require('gulp-coveralls');

gulp.task('watch', function () {
    gulp.watch('lib/**/*.js', ['build', 'test-min', 'lint']);
});

gulp.task('build', function () {
    return gulp.src('lib/run.js')
        .pipe(concat('app.js'))
        .pipe(insert.prepend('#! /usr/bin/env node \r\n\r\n'))
        .pipe(gulp.dest('bin'));
});

gulp.task('test', function() {
    return gulp.src('test/*.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('test-min', function() {
    return gulp.src('test/*.js', {read: false})
        .pipe(mocha({reporter: 'min'}));
});

gulp.task('coverage', function() {
    return gulp.src('test/coverage/**/lcov.info')
        .pipe(coveralls());
});

gulp.task('lint', function() {
    return gulp.src('lib/**/*.js')
        .pipe(jshint({node:true}))
        .pipe(jshint.reporter(jshStylish));
});

gulp.task('doc', function () {
    gulp.src('lib/**/*.js')
        .pipe(documentation({
            format: 'html',
            theme: docTheme
        }))
        .pipe(gulp.dest('doc'));
});

gulp.task('default', ['test']);