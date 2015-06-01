angular.module("pick-a-tech").controller("NewPickCtrl", 
  function($scope, $stateParams, $meteor, $location, $rootScope){

	$scope.picks = $meteor.collection(Picks).subscribe('picks');
	$scope.labels = $meteor.collection(Labels).subscribe('labels');
	$scope.newPick = {};
	$scope.newPick.candidates = [];
	
	$scope.createNew = function(){
		newPick = $scope.newPick;
		newPick.owner = $rootScope.currentUser._id;
		newPick.title =  _.map(newPick.candidates, function(label){ return label.name; }).join(" vs ");
		newPick.vote_up = [];
		newPick.vote_down = [];
		newPick.candidates = _.map(newPick.candidates, function(label){ 
			return {
				label_id: label._id,
				vote_up: [],
				pros_cons: []
				}; });
		$scope.picks.save(newPick).then(function(){
			$location.path('/picks');
		});
	};

});