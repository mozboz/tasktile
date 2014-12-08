
importanceMap = {"rect6": {
    1: [65,65,18,  '#b2b4e4', '#000000'],
    2: [140,65,12, '#bfc4da', '#ffffff'],
    3: [140,140,12, '#769acc', '#ffffff'],
    4: [290,290,14, '#5887bd', '#ffffff'],
    5: [370,290,16, '#314c9d', '#ffffff'],
    6: [570,290,22, '#2f3269', '#ffffff']
}};

WIDTH=0;
HEIGHT=1;
FONTSIZE=2;
BACKGROUND_COLOUR=3;
FOREGROUND_COLOUR=4;

IMPORTANCES = [{importanceValue: 1, importanceName: 'one'},
    {importanceValue: 2, importanceName: 'two'},
    {importanceValue: 3, importanceName: 'three'},
    {importanceValue: 4, importanceName: 'four'},
    {importanceValue: 5, importanceName: 'five'},
    {importanceValue: 6, importanceName: 'six'}
];

function getWidth(importance) {
    return importanceMap.rect6[importance][WIDTH];
}

function getHeight(importance) {
    return importanceMap.rect6[importance][HEIGHT];
}

function getFontSize(importance) {
    return importanceMap.rect6[importance][FONTSIZE];
}

function getTileBackgroundColour(importance) {
    return importanceMap.rect6[importance][BACKGROUND_COLOUR];
}

function getTileForegroundColour(importance) {
    return importanceMap.rect6[importance][FOREGROUND_COLOUR];
}

refitTiles = function() {

    setTimeout(function() {

            $('#tileGrid').freetile();
    }, 250);

//  setTimeout(function(){$('#tileGridSecond').freetile();}, 250);
}

Template.taskListItem.helpers({
    width: function() {
        return getWidth(this.importance);
    },

    height: function() {
        return getHeight(this.importance);
    }
});

Template.taskTile.helpers({
    width: function() {
        return getWidth(this.importance);
    },

    height: function() {
        return getHeight(this.importance);
    },

    fontSize: function() {
        return getFontSize(this.importance);
    },

    fgcolour: function() {
        return getTileForegroundColour(this.importance);
    },

    bgcolour: function() {
        return getTileBackgroundColour(this.importance);
    },

    importanceIs: function(importance) {
        return this.importance === importance;
    },

    importanceIsLessThan: function(importance) {
        return this.importance < importance;
    }
});

Template.taskListItem.events({
    'click input.delete': function () { // <-- here it is
        Tasks.remove(this._id);
        refitTiles();
    }
    /*
     'click': function () {
     Session.set("selected_player", this._id);
     }
     */
});

Template.taskGrid.helpers({
    tasks: function() {
        return Tasks.find();
    },

    width: function() {
        return getWidth(this.importance);
    },

    height: function() {
        return getHeight(this.importance)
    }
});

Template.taskList.helpers({
    tasks: function() {
        return Tasks.find();
    },
    importanceOptions: function() {
        return IMPORTANCES;
    },

    width: function() {
        return getWidth(this.importance);
    },

    height: function() {
        return getHeight(this.importance)
    }

});

Template.taskTile.events({
    'click #bigger': function(event) {
        Tasks.update(this._id, {$set: {importance: Math.min(IMPORTANCES.length, parseInt(this.importance) + 1)} });
        refitTiles();
        event.stopImmediatePropagation();
    },
    'click #smaller': function(event) {
        Tasks.update(this._id, {$set: {importance: Math.max(1, parseInt(this.importance) - 1)} });
        refitTiles();
        event.stopImmediatePropagation();
    },
    'mouseover': function(event) {
        $('#controls' + this._id).show();
    },
    'mouseout': function(event) {
        $('#controls' + this._id).hide();
    }
});

// This is called before the element is attached to the DOM and available for editing
Template.taskTile.created = function() {
    // alert(this.data._id + ' created');
    // $('#tile' + this.data._id).text('foo');
    // $('#tile' + this.data._id).html('foo');
    // $('#tile' + this.data._id).hide().html('bar');
}

Template.taskTile.rendered = function() {
    // alert(this.data._id + ' created');
    // $('#tile' + this.data._id).text('foo');
    // $('#tile' + this.data._id).html('bar');
    if (Math.random() < 0.25) {
        // $('#tile' + this.data._id).appendTo('#tileGridSecond');
    }

    // $('#tile' + this.data._id).hide().html('bar');
}