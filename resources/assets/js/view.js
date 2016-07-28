'use strict';

var _ = {}; //lodash methods wrapper
_.uniqueId = require('lodash/uniqueId');
_.extend = require('lodash/extend');

var View = function (options) {
    _.extend(this, options);
    this.id = _.uniqueId('view');
};

_.extend(View.prototype, require('./events'));

module.exports = View;