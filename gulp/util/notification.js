/**
 * Utility to notify using node with message(s)
 * Dependencies:
 *  - node-notifier
 */

var notifier = require('node-notifier');

module.exports = {
    notify: function(title, message) {
        title = title  || 'Notification';
        
        notifier.notify({
          title: title,
          message: message,
          sound: true
        });
    }
};