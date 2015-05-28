angular.module("pick-a-tech").controller("LabelsListCtrl", ['$scope', '$meteor',
  function($scope, $meteor){

    $scope.labels = $meteor.collection(Labels).subscribe('labels');

    $scope.remove = function(label){
      $scope.labels.splice( $scope.labels.indexOf(label), 1 );
    };

    $scope.removeAll = function(){
      $scope.labels.remove();
    };
}]);