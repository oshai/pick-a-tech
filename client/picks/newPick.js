angular.module("pick-a-tech").controller("NewPickCtrl", 
  function($scope, $stateParams, $meteor, $location, $rootScope){

	$scope.picks = $meteor.collection(Picks).subscribe('picks');
	$scope.labels = $meteor.collection(Labels).subscribe('labels');
	$scope.newPick = {};
	$scope.newPick.candidates = [];
	
	$scope.createNew = function(){
		$scope.newPick.owner = $rootScope.currentUser._id;
		$scope.newPick.title =  _.map($scope.newPick.candidates, function(label){ return label.name; }).join(" vs ");
		$scope.newPick.candidates = _.map($scope.newPick.candidates, function(label){ return label._id; });
		$scope.picks.save($scope.newPick).then(function(){
			$location.path('/picks');
		});
	};

});