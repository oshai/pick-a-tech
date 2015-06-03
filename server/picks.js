Meteor.publish("picks", function() {
	return Picks.find({});
});

Meteor.methods({
	vote : function(pickId, userId, key, candidateId) {
		check(pickId, String);
		check(userId, String);
		check(key, String);
		if (candidateId) {
            check(candidateId, String);
        }
		var pick = Picks.findOne(pickId);

		//need to test that
		if (key === 'description_vote_up') {
			if (_.contains(pick.vote_up, userId)) { //contains and press up
				Picks.update(pickId, { $pull: { vote_up: userId } });
			} else {
				if (_.contains(pick.vote_down, userId)) { //press up down contains
					Picks.update(pickId, { $pull: { vote_down: userId } });
				} else { //press up none contains
					Picks.update(pickId, { $addToSet: { vote_up: userId } });
				}
			}
		}
		if (key === 'description_vote_down') {
			if (_.contains(pick.vote_down, userId)) {
				Picks.update(pickId, { $pull: { vote_down: userId } });
			} else {
				if (_.contains(pick.vote_up, userId)) {
					Picks.update(pickId, { $pull: { vote_up: userId } });
				} else {
					Picks.update(pickId, { $addToSet: { vote_down: userId } });
				}
			}
		}
		if (key === 'label_thumb_up') {
            var candidates = Candidates.find({pick_id: pickId}).fetch();
			var found = null;
			var target = null;
			for (var i = 0; i < candidates.length; i++) {
				if (_.contains(candidates[i].vote_up, userId)) {
					found = candidates[i];
				}
				if (candidates[i]._id === candidateId) {
					target = candidates[i];
				}
			}
			if (found) {
				//remove
                Candidates.update({_id: found._id}, {$pull: {vote_up : userId}});
			} 
			if (target && found !== target) {
				//add
                Candidates.update({_id: target._id}, {$push: {vote_up : userId}});
			}
		}
	}
});