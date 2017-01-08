'use strict';

const gulp = require ('gulp');
const minify = require ('gulp-minify');
const sass = require ('gulp-sass');
const webpack = require ('webpack');
const del = require ('del');

gulp.task ('sass', () =>
  gulp.src ('src/sass/*.sass').pipe (sass ()).pipe (gulp.dest ('dist/css/'))
);

gulp.task ('webpack', (cb) =>
  gulp.src ('src/app.js')
    .pipe (webpackStream ({
      output: {
        filename: 'app.js'
      },
      module: {
        loaders: [{
          loader: ['babel-loader'],
          query: {
            cacheDirectory: 'babel_cache',
            presets: ['react', 'es2015']
          }
        }]
      },
      plugins: [
        new webpack.DefinePlugin ({
          'process.env': {
            NODE_ENV: process.env.NODE_ENV || '"production"'
          }
        })
      ],
    }))
    .pipe (minify ())
    .pipe (gulp.dest ('dist/js'))
);

gulp.task ('build', [ 'sass', 'webpack' ]);
gulp.task ('clean', () => del ([ 'babel_cache' ]));

gulp.task ('watch', () => {
  gulp.watch ('src/**/*.sass', [ 'sass' ]);
  gulp.watch ('src/**/*.js', [ 'webpack' ]);
});
