import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';

const paths = {
    allSrcJs: 'src/**/*.js?(x)',
    serverSrcJs: 'src/server/**/*.js?(x)',
    sharedSrcJs: 'src/shared/**/*.js?(x)',
    clientEntryPoint: 'src/client/app.jsx',
    gulpFile: 'gulpfile.babel.js',
    webpackFile: 'webpack.config.babel.js',
    libDir: 'lib',
    distDir: 'dist',
    clientBundle: 'dist/client-bundle.js?(.map)'
};

//del package for clean build es5 file
gulp.task('clean', () => del([paths.libDir, paths.clientBundle]));

//execute clean task before build
gulp.task('build', ['clean'], () => {
    return gulp.src(paths.allSrcJs)
        .pipe(babel())
        .pipe(gulp.dest(paths.libDir));
});

//running node lib
gulp.task('main', ['clean'], () => 
    gulp.src(paths.clientEntryPoint)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(paths.distDir))
);

//run main task when file in src folder changes
gulp.task('watch', () => {
    gulp.watch(paths.allSrcJs, ['main']);
});

//call gulp from cli run default task
gulp.task('default', ['watch', 'main']);