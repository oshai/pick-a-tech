Userinfo = new Mongo.Collection("userinfo");

Userinfo.allow({
	  insert: function (userId, label) {
	    return false;
	  },
	  update: function (userId, label, fields, modifier) {
	    return false;
	  },
	  remove: function (userId, label) {
	    return false;
	  }
	});

