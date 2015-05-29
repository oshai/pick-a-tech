angular.module("pick-a-tech").controller("LabelsListCtrl",
  function($scope, $meteor, $rootScope){

    $scope.labels = $meteor.collection(Labels).subscribe('labels');
    $scope.newLabel = {};

    $scope.remove = function(label){
      $scope.labels.splice( $scope.labels.indexOf(label), 1 );
    };
    $scope.createLabel = function(){
    	$scope.newLabel.owner=$rootScope.currentUser._id;
    	$scope.labels.save( $scope.newLabel );
    };

    $scope.removeAll = function(){
      $scope.labels.remove();
    };
});