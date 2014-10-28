Router.map( function () {
    this.route('about');
});

Meteor.subscribe('tasks');
