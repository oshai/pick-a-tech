
var MAX_PICKS = 10;

//database collection
Technologies = new Mongo.Collection("technologies");
Picks = new Mongo.Collection("picks");

//Routing
Router.configure({
    layoutTemplate: 'ApplicationLayout'
});
Router.route('/', function() {
    this.render('pickListTemplate');
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
}

//Server code
if (Meteor.isServer) {
  Meteor.startup(function() {
    return Meteor.methods({}
    );
  });
}

