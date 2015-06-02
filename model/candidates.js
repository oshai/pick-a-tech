Candidates = new Mongo.Collection("candidates");

Candidates.allow({
	  insert: function (userId, label) {
	    return userId && label.owner === userId;
	  },
	  update: function (userId, label, fields, modifier) {
	    if (userId !== label.owner)
	      return false;

	    return true;
	  },
	  remove: function (userId, label) {
	    if (userId !== label.owner)
	      return false;

	    return true;
	  }
	});

