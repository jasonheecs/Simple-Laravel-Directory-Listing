'use strict';

/**
 * Mix in to any object in order to provide it with custom events.
 */

var Events = {
    channels: {},
    eventNumber: 0,
    // Used to publish to subscribers that an event of their interest happened
    trigger: function(events, data) {
        for (var topic in Events.channels) {
            if (Events.channels.hasOwnProperty(topic)) {
                if (topic.split('-')[0] == events) {
                    Events.channels[topic](data) !== false || delete Events.channels[topic];
                }
            }
        }
    },
    // Used to register for the event to listen
    on: function(events, callback) {
        Events.channels[events + --Events.eventNumber] = callback;
    },
    // Used to unsubscribe/stop listening to the event
    off: function(topic) {
        delete Events.channels[topic];
    }
};

module.exports = Events;