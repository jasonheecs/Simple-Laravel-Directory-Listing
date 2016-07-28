'use strict';

var _ = {}; //lodash methods wrapper
_.uniqueId = require('lodash/uniqueId');
_.clone = require('lodash/clone');
_.isObject = require('lodash/isObject');
_.extend = require('lodash/extend');

var Model = function (attributes) {
    this.id = _.uniqueId('model');
    this.attributes = attributes || {};
};

Model.prototype.get = function(attr) {
    return this.attributes(attr);
};

Model.prototype.set = function(attrs) {
    if (_.isObject(attrs)) {
        _.extend(this.attributes, attrs);
        this.change(attrs);
    }

    return this;
};

Model.prototype.toJSON = function(options) {
    return _.clone(this.attributes);
};

Model.prototype.change = function(attrs) {
    this.trigger(this.id + 'update', attrs);
};

_.extend(Model.prototype, require('./events'));

module.exports = Model;