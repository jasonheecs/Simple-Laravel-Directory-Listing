'use strict';

var _ = {}; //lodash methods wrapper
_.uniqueId = require('lodash/uniqueId');
_.extend = require('lodash/extend');
_.each = require('lodash/each');

var $ = document.querySelectorAll.bind(document) || window.jQuery;

var Controller = function(options) {
    _.extend(this, options);
    this.id = _.uniqueId('controller');

    var parts;
    var selector;
    var eventType;
    if (this.events) {
        _.each(this.events, function(method, eventName){
            parts = eventName.split('.');
            selector = parts[0];
            eventType = parts[1];
            //@TODO use add event listener?
            $(selector)['on' + eventType] = this[method];
        }.bind(this));
    }
};

module.exports = Controller;