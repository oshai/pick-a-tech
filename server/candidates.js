Meteor.publish("candidates", function () {
  return Candidates.find({});
});