Candidates = new Mongo.Collection("candidates");

Candidates.allow({
	  insert: function (userId, label) {
	    return userId;
	  },
	  update: function (userId, label, fields, modifier) {
	    return false;
	  },
	  remove: function (userId, label) {
	    return false;
	  }
	});

