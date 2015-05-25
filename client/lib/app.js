angular.module('pick-a-tech',['angular-meteor', 'ui.router']);

function onReady() {
  angular.bootstrap(document, ['pick-a-tech']);
}

if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);