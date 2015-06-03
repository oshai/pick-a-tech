angular.module("pick-a-tech").controller('NewProConModalInstanceCtrl', function($scope, $modalInstance) {

	$scope.pro = true;
	$scope.proCon = '';

	$scope.selectPro = function(b) {
		$scope.pro = b;
	};
	$scope.ok = function() {
		$modalInstance.close(($scope.pro ? 'Pro: ' : 'Con: ') + $scope.proCon);
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});
