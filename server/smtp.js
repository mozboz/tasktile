Meteor.startup(function () {
    process.env.MAIL_URL = 'smtp://lewis.james%40gmail.com:uywjyzjrvwomqnqx@smtp.gmail.com:587/';
});

Meteor.methods({
    sendEmail: function (to, from, subject, text) {
        check([to, from, subject, text], [String]);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        Email.send({
            to: to,
            from: from,
            subject: subject,
            text: text
        });
    }
});

/*
 Meteor.call('sendEmail',
 'lewis.james@gmail.com',
 'lewis.james@gmail.com',
 'Hello from Meteor!',
 'This is a test of Email.send.');
*/