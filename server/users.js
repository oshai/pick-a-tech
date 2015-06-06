Meteor.publish("users", function () {
    return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});

Meteor.methods({
    getScore: function (user) {
        var result = 0;
        var id = user._id;
        Meteor.picks.forEach(function(pick){
            if (pick.owner !== id) {
                return;
            }
            result += 5 * (pick.vote_up.length - pick.vote_down.length);
        });
        Meteor.comments.forEach(function(comment){
            if (comment.owner !== id) {
                return;
            }
            result += 10 * (comment.vote_up.length - comment.vote_down.length);
        });
        if (result < 1) {
            return 1;
        }
        return result;
    }
});

Meteor.users.deny({
    update: function() {
        return true;
    }
});

