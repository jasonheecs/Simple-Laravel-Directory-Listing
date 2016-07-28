'use strict';

var $ = require('jquery');

var Model = require('./model');
var Controller = require('./controller');
var View = require('./view');

var item = new Model({
    counter: 0,
    incr: function() {
        item.set({counter: ++this.counter});
    }
});

var itemView = new View({
    el: '.grid-item',

    observe: function(model) {
        this.on(model.id + 'update', function() {
            window.alert('yes');
        }.bind(this));
    }
});

var itemController = new Controller({
    // specify the model to update
    model: item,

    // specify the view to observe this model
    view: itemView,

    events: {
        '#js-test.click': 'alerter'
    },

    init: function() {
        this.view.observe(this.model);
        console.log(this.view);
        console.log(this.model);
        return this;
    },
    alerter: function() {
        window.alert('test');
    }
});

module.exports = {
    init: function() {
        itemController.init(item, itemView);
    }
};