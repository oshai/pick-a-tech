Meteor.publish("picks", function () {
    return Picks.find({});
});

Meteor.methods({
    vote: function (pickId, userId, key, objectId) {
        check(pickId, String);
        check(userId, String);
        check(key, String);
        if (objectId) {
            check(objectId, String);
        }
        var pick = Picks.findOne(pickId);
        var userid = -1;
        var score = 0;

        //need to test that
        if (key === 'description_vote_up') {
            if (_.contains(pick.vote_up, userId)) { //contains and press up
                Picks.update(pickId, {$pull: {vote_up: userId}});
            } else {
                if (_.contains(pick.vote_down, userId)) { //press up down contains
                    Picks.update(pickId, {$pull: {vote_down: userId}});
                } else { //press up none contains
                    Picks.update(pickId, {$addToSet: {vote_up: userId}});
                }
            }
            userid = pick.owner;
            score = 5;
        }
        if (key === 'description_vote_down') {
            if (_.contains(pick.vote_down, userId)) {
                Picks.update(pickId, {$pull: {vote_down: userId}});
            } else {
                if (_.contains(pick.vote_up, userId)) {
                    Picks.update(pickId, {$pull: {vote_up: userId}});
                } else {
                    Picks.update(pickId, {$addToSet: {vote_down: userId}});
                }
            }
            userid = pick.owner;
            score = -5;
        }
        if (key === 'comment_vote_up') {
            var comment = Comments.findOne(objectId);
            if (_.contains(comment.vote_up, userId)) { //contains and press up
                Comments.update(objectId, {$pull: {vote_up: userId}});
            } else {
                if (_.contains(comment.vote_down, userId)) { //press up down contains
                    Comments.update(objectId, {$pull: {vote_down: userId}});
                } else { //press up none contains
                    Comments.update(objectId, {$addToSet: {vote_up: userId}});
                }
            }
            userid = comment.owner;
            score = 5;
        }
        if (key === 'comment_vote_down') {
            var comment = Comments.findOne(objectId);
            if (_.contains(comment.vote_down, userId)) {
                Comments.update(objectId, {$pull: {vote_down: userId}});
            } else {
                if (_.contains(comment.vote_up, userId)) {
                    Comments.update(objectId, {$pull: {vote_up: userId}});
                } else {
                    Comments.update(objectId, {$addToSet: {vote_down: userId}});
                }
            }
            userid = comment.owner;
            score = -5;
        }
        if (key === 'label_thumb_up') {
            var candidates = Candidates.find({pick_id: pickId}).fetch();
            var found = null;
            var target = null;
            for (var i = 0; i < candidates.length; i++) {
                if (_.contains(candidates[i].vote_up, userId)) {
                    found = candidates[i];
                }
                if (candidates[i]._id === objectId) {
                    target = candidates[i];
                }
            }
            if (found) {
                //remove
                Candidates.update({_id: found._id}, {$pull: {vote_up: userId}});
            }
            if (target && found !== target) {
                //add
                Candidates.update({_id: target._id}, {$push: {vote_up: userId}});
            }
        }
        Userinfo.update({user_id: userid}, {$inc: {score: score}}, {upsert:true});
    }
});
