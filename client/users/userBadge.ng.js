angular.module("pick-a-tech").controller("UserBadgeController",
    function ($scope, $meteor, $rootScope) {
        if (null !== $rootScope.currentUser) {
            $scope.userForScore = $meteor.object(Userinfo, {user_id: $rootScope.currentUser._id});
        }

        $scope.userScore = function(){
            return $scope.userForScore.score;
        };
    });