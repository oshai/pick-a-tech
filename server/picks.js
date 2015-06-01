Meteor.publish("picks", function() {
	return Picks.find({});
});

Meteor.methods({
	vote : function(pickId, userId, key) {
		check(pickId, String);
		check(userId, String);
		check(key, String);
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
	}
});