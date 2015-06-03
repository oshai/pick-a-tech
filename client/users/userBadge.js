angular.module("pick-a-tech").controller("UserBadgeController", ["$scope", "$meteor", "$rootScope",
    function ($scope, $meteor, $rootScope) {
        $scope.userForScore = $meteor.object(Userinfo, {user_id: $rootScope.currentUser._id});

        $scope.userScore = function () {
            return $scope.userForScore.score;
        };
    }]);
