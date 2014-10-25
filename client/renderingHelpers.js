
Meteor.startup(function() {
    refitTiles();
})

importanceMap = {"rect6": {
    1: [100,60,12,  '#b2b4e4', '#ffffff'],
    2: [100,120,14, '#bfc4da', '#ffffff'],
    3: [100,180,16, '#769acc', '#ffffff'],
    4: [100,240,18, '#5887bd', '#ffffff'],
    5: [200,120,20, '#314c9d', '#ffffff'],
    6: [200,240,22, '#2f3269', '#ffffff']
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
    setTimeout(function(){$('#tileGrid').freetile();}, 250);
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
    }
});