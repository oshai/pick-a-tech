angular.module("pick-a-tech").controller('NewLabelModalInstanceCtrl', ["$scope", "$modalInstance",
    function ($scope, $modalInstance) {

        $scope.newLabel = {};

        $scope.ok = function () {
            $modalInstance.close($scope.newLabel);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);
