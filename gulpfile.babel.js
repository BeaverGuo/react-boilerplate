import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';

import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';

import { spawn } from 'child_process';


var node;
//import { exec } from 'child_process';

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
//transform files under 'src' directory to 'lib', 'clean' task delete auto-generated 'lib' folder before 'build'. the second parameter is prerequisite tasks
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
//runs the main task when filesystem changes.watch for changes
gulp.task('watch', ()=>{
    gulp.watch(paths.allSrcJs, ['main']);
});
//gulp server. launch the server. If there's a server already running, kill it.
// gulp.task('server', function() {
//   if (node) node.kill()
//   node = spawn('node', ['src/server/index.js'], {stdio: 'inherit'})
//   node.on('close', function (code) {
//     if (code === 8) {
//       gulp.log('Error detected, waiting for changes...');
//     }
//   });
// })
//type gulp in CLI runs default task
gulp.task('default', ['watch', 'main']);

