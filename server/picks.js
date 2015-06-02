Meteor.publish("picks", function() {
	return Picks.find({});
});

Meteor.methods({
	vote : function(pickId, userId, key, id) {
		check(pickId, String);
		check(userId, String);
		check(key, String);
		check(id, String);
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
			var arrayLength = pick.candidates.length;
			var found = -1;
			var target = -1;
			var selfClick = false;
			for (var i = 0; i < arrayLength; i++) {
				if (_.contains(pick.candidates[i], userId)) {
					found = i;
					if (pick.candidates[i].label_id === id) {
						selfClick = true;
					}
				}
				if (pick.candidates[i].label_id === id) {
					target = i;
				}
			}
			if (found !== -1) {
				//remove
				var pullKey = "candidates." + found.toString() + ".vote_up";
				Picks.update({_id: pickId}, {$pull: {pullKey : userId}});
			} 
			if (!selfClick) {
				//add
				var addKey = "candidates." + target.toString() + ".vote_up";
				Picks.update({_id: pickId}, {$push: {addKey : userId}});
			}
		}
	}
});