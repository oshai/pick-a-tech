Meteor.publish("userinfo", function () {
    return Userinfo.find({});
});

