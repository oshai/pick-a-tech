angular.module("pick-a-tech").controller("NewPickCtrl", 
  function($scope, $stateParams, $meteor, $location, $rootScope){

	$scope.picks = $meteor.collection(Picks).subscribe('picks');
	$scope.labels = $meteor.collection(Labels).subscribe('labels');
	
	$scope.createNew = function(){
		$scope.newPick.owner=$rootScope.currentUser._id; 
		$scope.picks.push($scope.newPick);
		$location.path('/picks')
	};

});