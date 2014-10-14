if (Meteor.isClient) {
    Meteor.startup(function() {
        $('.firsttest').freetile({animate: true, elementDelay: 5});
    })

Deps.autorun(function() {
    console.log('There are ' + Tasks.find().count() + ' posts');
    $('#tileGrid').freetile();
});


}