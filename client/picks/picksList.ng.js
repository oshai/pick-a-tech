angular.module("pick-a-tech").controller("PicksListCtrl", ['$scope', '$meteor',
  function($scope, $meteor){

    $scope.picks = $meteor.collection(Picks).subscribe('picks');

    $scope.getTitle = function(title){
      return title.replace(new RegExp(' ', 'g'), '_');
    };

}]);