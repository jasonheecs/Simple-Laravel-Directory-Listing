/**
 * Exports database as a sql dump into the databases folder.
 * Dependencies:
 * - gulp-ssh
 * - gulp-notifier
 */

var gulp = require('gulp');
var util = require('util');
var GulpSSH = require('gulp-ssh');
var notification = require('../../util/notification');
var gnotify = require('gulp-notify');
var exec = require('child_process').exec;
var credentials = require('../../credentials').db.local;
var config = require('../../config').db.import;
var inquirer = require('inquirer');

var databaseFile;
var shellCommand;

gulp.task('db:import', function(callback) {
    var sqlDumpFilePath = config.dest + config.filename;

    inquirer.prompt([{
        type: 'input',
        name: 'database_file',
        message: 'What is the filename (including any sub-directory path) of the .sql file?',
        validate: function (value) {
            var fileExtension = value.split('.').pop();
            if (fileExtension !== 'sql') {
                return 'Invalid file! File needs to end in .sql';
            }

            return true;
        }
    }]).then(function (answers) {
        databaseFile = answers.database_file;

        if (credentials.ssh) { //if ssh credentials are present (i.e: using vagrant box)
            var gulpSSH = new GulpSSH({
              ignoreErrors: false,
              sshConfig: credentials.ssh
            });
            shellCommand = getSqlDumpCommand(config.sshDirRoot + databaseFile);

            return gulpSSH
                .exec([shellCommand],{filePath: databaseFile})
                .pipe(gnotify({
                    title: 'Database imported',
                    message: 'SQL File imported successfully'
                }));
        } else {
            shellCommand = getSqlDumpCommand(databaseFile);

            exec(shellCommand, function (err, stdout, stderr) {
                if (!err) {
                    // use node notifier instead of gulp notifer here because not using gulp stream.
                    // feels more right this way, rather than hacking a solution.
                    notification.notify('Database imported',
                                        'SQL File imported successfully');
                }

                callback(err);
            });
        }
    });
});

/**
 * Generates the shell command for mysqldump depending on if there is a blank password / using GulpSSH.
 * @return {string} mysqldump shell command
 */
function getSqlDumpCommand(databaseFile) {
    var shellCommand;

    if (credentials.password.length === 0) {
        shellCommand = util.format('mysql -u %s -h %s %s < %s', 
                                    credentials.username, credentials.host, credentials.db_name, databaseFile);
    } else {
        shellCommand = util.format('mysql -u %s -p%s -h %s %s < %s', 
                                    credentials.username, credentials.password, credentials.host, credentials.db_name, databaseFile);
    }

    return shellCommand;
}