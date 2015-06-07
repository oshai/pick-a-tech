angular.module("pick-a-tech").controller("UserBadgeController",
    function ($scope, $meteor, $rootScope, $log) {

        $meteor.autorun($scope, function() {
            if (null !== $rootScope.currentUser) {
                $scope.userForScore = $scope.$meteorObject(Userinfo, {user_id: $scope.getReactively('currentUser')._id});//$rootScope.currentUser._id
            }
        });

        $scope.userScore = function(){
            if ($scope.userForScore === undefined || $scope.userForScore.score === undefined) {
                return 1;
            }
            return $scope.userForScore.score;
        };
    });