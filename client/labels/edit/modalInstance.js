// Please note that $modalInstance represents a modal window (instance) dependency.
angular.module("pick-a-tech").controller('ModalInstanceCtrl', function ($scope, $modalInstance) {

	$scope.newLabel = {};
	
  $scope.ok = function () {
    $modalInstance.close($scope.newLabel);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
