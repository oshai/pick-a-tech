angular.module('pick-a-tech',['angular-meteor', 'ui.router', 'hc.marked']);

angular.module('pick-a-tech').config(['markedProvider', function(markedProvider) {
    markedProvider.setOptions({gfm: true, breaks: true});
  }]);

function onReady() {
  angular.bootstrap(document, ['pick-a-tech']);
}

if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);