if (Meteor.isClient) {
    Meteor.startup(function() {
        $('#tileGrid').freetile({animate: true, elementDelay: 5});

        Deps.autorun(function() {
            $('#tileGrid').freetile();
        });

        setTimeout(function(){$('#tileGrid').freetile();},250);
    })


    /*
    setInterval(function(){
        Tasks.update(Tasks.findOne()._id, {$set: {importance: Math.floor((Math.random() * 6) + 1)}});
        setTimeout(function(){$('#tileGrid').freetile();},250);
    },2000);
    */

}

