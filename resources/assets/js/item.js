'use strict';

var $ = require('jquery');
var _ = {}; // lodash wrapper
_.uniq = require('lodash/uniq');
_.find = require('lodash/find');
_.template = require('lodash/template');
_.remove = require('lodash/remove');

var $grid;
var items;

var Item = function($el) {
    this.$el = $el;
    this.$editEl = $el.find('.js-edit-item');
    this.$deleteEl = $el.find('.js-delete-item');
};

Item.prototype.create = function(templateHTML) {
    this.setView(templateHTML);
    this.$el.removeClass('grid-item--add');
    this.createFormSubmit();
};

Item.prototype.setView = function(templateHTML) {
    this.$el.html(templateHTML);
};

Item.prototype.createFormSubmit = function() {
    var item = this;
    this.$el.find('form').on('submit', function(evt) {
        evt.preventDefault();

        item.sendCreateRequest($(this));
    });
};

Item.prototype.sendCreateRequest = function($form) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.post('/item', $form.serialize(), function() {
        var templateData = {
            name: $form.find('input[name="name"]').val(),
            link: $form.find('input[name="url"]').val(),
            description: $form.find('textarea[name="description"]').val()
        };

        $(createNewItem(templateData).$el).insertBefore(this.$el);

        this.setToAddView();
    }.bind(this));
};

Item.prototype.setToAddView = function() {
    this.setView($('#add-item-template').html());
    this.$el.addClass('grid-item--add');
};

Item.prototype.delete = function() {
    this.sendDeleteRequest(function() {
        deleteItem(this);
        $(this.$el).remove();
    }.bind(this));
};

Item.prototype.sendDeleteRequest = function(callback) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    var itemId = this.$el.attr('data-id');

    $.ajax({
        type: 'DELETE',
        url: '/item/' + itemId,
        data: {
            '_method': 'DELETE',
            'id': itemId
        },
        dataType: 'json',
        success: function(data) {
            callback.call();
            console.log(data);
        }
    });
};

function init() {
    $grid = $('#js-grid');
    items = [];

    var $gridItems = $grid.children('.grid-item');
    $gridItems.each(function(index, el) {
        var item = new Item($(el));
        items.push(item);
    });

    //@TODO refactor into Grid class?
    $grid.on('click', '.grid-item--add', function() {
        var $el = $(this);

        var item = _.find(items, function(item){
            return item.$el[0] === $el[0];
        });

        item.create($('#create-item-template').html());
    });

    $grid.on('click', '.js-delete-item', function(evt) {
        evt.preventDefault();
        var $el = $(this);

        var item = _.find(items, function(item){
            return item.$deleteEl[0] === $el[0];
        });

        if (window.confirm('Are you sure?')) {
            item.delete();
        }
    });
}

function getListOfClassNames() {
    var classNames = [];

    $.each(items, function(index, item){
        $.each(item.$el.attr('class').split(/\s+/), function(index, className) {
            classNames.push(className);
        });
    });

    return _.uniq(classNames);
}

function createNewItem(data) {
    var template = _.template($('#show-item-template').html());
    var $newEl = $(template(data));
    var item = new Item($newEl);

    items.push(item);

    return item;
}

function deleteItem(_item) {
    _.remove(items, function(item) {
        return item === _item;
    });
}

module.exports = {
    init: init
};