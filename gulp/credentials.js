/**
 * Credentials for gulp deployment tasks. Remember to not to commit this file to public repos!!
 */

module.exports = {
    ftp: {
        host: 'example.com',
        username: 'user@example.com',
        password: 'password',
        directory: '/project_dir'
    },
    db: {
        local: {
            host: 'localhost',
            db_name: 'project',
            username: 'root',
            password: 'root',

            // set ssh credentials if using vagrant box
            // ssh: {
            //     host: '192.168.33.10',
            //     username: 'vagrant',
            //     password: 'vagrant'
            // }
        }
    }
};