Meteor.startup(function(){
    setTimeout(function() {
        Session.set('selectedTask', 'NULL');
        refitTiles();
    }, 500);

});

Meteor.subscribe('tasks');