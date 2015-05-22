Meteor.startup(function () {
  if (Labels.find().count() === 0) {
    var labels = [
      {'name': 'Dubstep-Free Zone',
        'description': 'Fast just got faster with Nexus S.'},
      {'name': 'All dubstep all the time',
        'description': 'Get it on!'},
      {'name': 'Savage lounging',
        'description': 'Leisure suit required. And only fiercest manners.'}
    ];
    for (var i = 0; i < labels.length; i++)
      Labels.insert({name: labels[i].name, description: labels[i].description});
  }
});