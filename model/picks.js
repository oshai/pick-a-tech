Picks = new Mongo.Collection("picks");

Picks.allow({
	  insert: function (userId, pick) {
	    return userId && pick.owner === userId;
	  },
	  update: function (userId, pick, fields, modifier) {
	    if (userId !== pick.owner)
	      return false;

	    return true;
	  },
	  remove: function (userId, pick) {
	    if (userId !== pick.owner)
	      return false;

	    return true;
	  }
	});

