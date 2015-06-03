angular.module("pick-a-tech").controller("UserBadgeController",
    function ($scope, $meteor, $rootScope) {
        $scope.userForScore = $meteor.object(Userinfo, $rootScope.currentUser._id);

        $scope.userScore = function(){
            return $scope.userForScore.score;
        };
    });