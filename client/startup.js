Meteor.startup(function(){
    setTimeout(function() {
        Session.set('selectedTask', 'NULL');
    }, 100);

});

Meteor.subscribe('tasks');
