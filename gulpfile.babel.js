import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';

import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';
//import { exec } from 'child_process';

//因为我们的node版本支持es6所以下面是用es6的语法写的,但不支持es6 modules,但心名字为gulpfile.babel.js可以通过babel调用
// const babel = require('gulp-babel');
// const del = require('del');
// const exec = require('child_process').exec;


//paths store file paths
const paths = {
    allSrcJs: 'src/**/*.js?(x)',
    serverSrcJs: 'src/server/**/*.js?(x)',
    sharedSrcJs: 'src/shared/**/*.js?(x)',
    clientEntryPoint: 'src/client/app.jsx',
    gulpFile: 'gulpfile.babel.js',
    webpackFile: 'webpack.config.babel.js',
    libDir: 'lib',
    distDir: 'dist',
    clientBundle: 'dist/client-bundle.js?(.map)',
};

//5 tasks, use del package to delete files under 'lib' directory
gulp.task('clean', () => del([
    paths.libDir,
    paths.clientBundle,
]));
//transform files under 'src' directory to 'lib', 'clean' task delete auto-generated 'lib' folder before 'build'
gulp.task('build', ['clean'], () =>
    gulp.src(paths.allSrcJs)
        .pipe(babel())
        .pipe(gulp.dest(paths.libDir))
);
//running node in 'lib/index.js'
gulp.task('main',['clean'], () => 
    gulp.src(paths.clientEntryPoint)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(paths.distDir))
);
//runs the main task when filesystem changes
gulp.task('watch', ()=>{
    gulp.watch(paths.allSrcJs, ['main']);
});
//type gulp in CLI runs default task
gulp.task('default', ['watch', 'main']);

