'use strict';

var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var cssmin = require( 'gulp-cssmin' );
var rigger = require( 'gulp-rigger' );
var rename = require( 'gulp-rename' );
var sourceMaps = require( 'gulp-sourcemaps' );
var rimraf = require( 'rimraf' );
var wait = require( 'gulp-wait' );
var concat = require( 'gulp-concat' );
var strip = require( 'gulp-strip-comments' );
var uglify = require( 'gulp-uglify' );

//object with our paths
var path = {
    src: {
        js: [
            'node_modules/jquery/dist/jquery.js'
            ,'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js'
            ,'node_modules/odometer/odometer.js'
            ,'js/*.js'
        ]        ,
        sass: 'css/**/*.scss'
        ,css: [
            'css/*.css'
            ,'node_modules/odometer/themes/odometer-theme-minimal.css'
        ]
        /*,ico: [
         'ico/*.*'
         ]*/
        ,img: [
            'images/*.*'
        ]
        ,html: 'src/*.html'
    }
    ,clean: 'dist'
    ,js: {
        concat: 'site.js'
        ,min: 'site.min.js'
    }
    ,css: {
        staging: 'css'
        ,concat: 'site.css'
        ,min: 'site.min.css'
    }
    ,build: {
        html: './dist/'
        ,js: 'dist/assets/js/'
        ,css: 'dist/assets/css/'
        ,img: 'dist/assets/img/'
    }
};

//our config
var config = {
    server: {
        baseDir: './dist'
        ,tunnel: true
        ,host: '127.0.0.1'
        ,port: 9000
        ,logPrefix: 'Gulp_Devil'
    }
};


//task for html
gulp.task( 'html:build', function(){
    gulp.src( path.src.html )
        .pipe( gulp.dest( path.build.html ) )
        .pipe(wait(1000));
} );

//copy image files
gulp.task( 'img:build', function(){
    gulp.src( path.src.img )
        .pipe( gulp.dest( path.build.img ) )
        .pipe(wait(1000));
} );

//copy image files
gulp.task( 'ico:build', function(){
    gulp.src( path.src.ico )
        .pipe( gulp.dest( path.build.ico ) )
        .pipe(wait(1000));
} );

//copy php api files
gulp.task( 'api:build', function(){
    gulp.src( path.src.api )
        .pipe( gulp.dest( path.build.api ) )
        .pipe(wait(1000));
} );

//copy html5shiv file separately, must be included at top.
gulp.task( 'html5shiv:build', function(){
    gulp.src( path.html_shiv )
        .pipe( gulp.dest( path.build.js ) )
        .pipe(wait(1000));
} );

//copy respond.js file separately, must be included at top.
gulp.task( 'respondjs:build', function(){
    gulp.src( path.respondjs )
        .pipe( gulp.dest( path.build.js ) )
        .pipe(wait(1000));
} );

//task for js concat
gulp.task( 'js:build:prod', function(){
    gulp.src( path.src.js )
        .pipe( concat( path.js.concat ) )
        .pipe( gulp.dest( path.build.js ))
        .pipe( rename( path.js.min ))
        .pipe( uglify() )
        .pipe( gulp.dest( path.build.js ))
        .pipe(wait(1000));
} );

gulp.task('css:sass', function () {
    return gulp.src( path.src.sass )
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.css.staging));
});

//task for css min & concat
gulp.task('css:build:prod', function(){
    gulp.src( path.src.css )
        .pipe( concat(path.css.concat) )
        .pipe( gulp.dest( path.build.css ))
        .pipe( cssmin({keepSpecialComments: 0}) )
        .pipe( rename(path.css.min) )
        .pipe( gulp.dest( path.build.css ) );
});


gulp.task( 'clean', function( cbf ){
    rimraf( path.clean, cbf );
} );

gulp.task( 'default', ['clean', 'js:build:prod', 'css:sass', 'css:build:prod'] );
