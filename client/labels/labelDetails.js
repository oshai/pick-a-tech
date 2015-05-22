angular.module("pick-a-tech").controller("LabelDetailsCtrl", ['$scope', '$stateParams', '$meteor',
  function($scope, $stateParams, $meteor){

    $scope.label = $meteor.object(Labels, $stateParams.labelId);

}]);