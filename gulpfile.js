{

    var gulp = require('gulp'),
        tsc = require('gulp-tsc'),
        seq = require('run-sequence'),
        del = require('del'),
        watch = require('gulp-watch');

    var paths = {
        ts: {
            src: [
                'scripts/ts/*.ts'
            ],
            dest : 'scripts/'
        }
    }

    // Default
    gulp.task('default', ['build', 'run']);

    // Clean
    gulp.task('clean', function (cb) {
        del(paths.ts.dest + '/*.js', cb);
    })

    gulp.task('watch', function () {
        gulp.watch(paths.ts.src, ['build']);
    });

    // Build
    gulp.task('build', function () {
        return gulp
            .src(paths.ts.src)
           
            .pipe(tsc({
                module: "CommonJS",
                sourcemap: true,
                emitError: false
            }))
            .pipe(gulp.dest(paths.ts.dest));
    });

    // ReBuild - Clean & Build
    gulp.task('rebuild', function (cb) {
        seq('clean', 'build', cb);
    });

     // Run
    gulp.task('run', function (cb) {
        console.log('running...')
        
        require('child_process').exec('k mon', function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            console.log('done...');
            cb();
        });
        
    });
}