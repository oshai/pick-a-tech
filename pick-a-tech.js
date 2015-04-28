
var MAX_PICKS = 10;

//database collection
Technologies = new Mongo.Collection("technologies");
Picks = new Mongo.Collection("picks");

//Routing
Router.configure({
    layoutTemplate: 'ApplicationLayout'
});
Router.route('/', function () {
	  this.redirect('/picks');
	});
Router.route('/picks', function() {
    this.render('pickListTemplate');
});
Router.route('/picks/new', function() {
    this.render('newPickTemplate');
});

//Client Code
if (Meteor.isClient) {
    Template.pickListTemplate.helpers({
        picks: function() {
			//sort picks by creation (newest first),
			//limit number of displayed entries
            return Picks.find({}, {sort: {createdAt: -1}, limit: MAX_PICKS});
        }
    });
    
    Template.newPickTemplate.events({
        "submit .new-pick": function(event) {
            // This function is called when the new pick form is submitted
            var title = event.target.title.value;
			//insert to database
            Picks.insert({
                title: title,
                createdAt: new Date() // current time
            });
            // Clear form
            event.target.title.value = "";
            
            window.location = "/picks";
            
            // Prevent default form submit
            return false;
        }
    });
}

//Server code
if (Meteor.isServer) {
  Meteor.startup(function() {
    return Meteor.methods({}
    );
  });
}

