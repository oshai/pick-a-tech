angular.module("pick-a-tech").controller("PicksListCtrl", ['$scope', '$meteor',
  function($scope, $meteor){

    $scope.picks = $meteor.collection(Picks).subscribe('picks');

    $scope.remove = function(pick){
      $scope.picks.splice( $scope.picks.indexOf(pick), 1 );
    };

    $scope.removeAll = function(){
      $scope.picks.remove();
    };
}]);