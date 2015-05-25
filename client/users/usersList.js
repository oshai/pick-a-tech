angular.module("pick-a-tech").controller("UsersListCtrl", ['$scope', '$meteor',
  function($scope, $meteor){

	$scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
}]);