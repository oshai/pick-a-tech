angular.module("pick-a-tech").controller("NewPickCtrl", 
  function($scope, $stateParams, $meteor, $location, $rootScope, $q){

	$scope.picks = $meteor.collection(Picks).subscribe('picks');
	$scope.labels = $meteor.collection(Labels).subscribe('labels');
	$scope.candidates = $meteor.collection(Candidates).subscribe('candidates');
	$scope.newPick = {};
	$scope.newCandidates = [];

      $scope.getText = function(label){
          return label.description.length > 50 ? label.description.substr(0, 49) + '...' : label.description;
      }
	$scope.createNew = function(){
		var newPick = $scope.newPick;
		newPick.owner = $rootScope.currentUser._id;
		newPick.title =  _.map($scope.newCandidates, function(label){ return label.name; }).join(" vs ");
		newPick.vote_up = [];
		newPick.vote_down = [];

        $scope.picks.save(newPick).then(function(data){
            var newCandidatesDocs = _.map($scope.newCandidates, function(label){
                return {
                    label_id: label._id,
                    pick_id: data._id,
                    vote_up: []
                }});
            $scope.candidates.save(newCandidatesDocs).then(function() {
                $location.path('/picks');
            });
		});
    };

});