angular.module("pick-a-tech").controller("PickDetailsCtrl", ['$scope', '$stateParams', '$meteor',
  function($scope, $stateParams, $meteor){

    $scope.pick = $meteor.object(Picks, $stateParams.pickId).subscribe('picks');

}]);