angular.module("pick-a-tech").controller("UserBadgeController",
    function ($scope, $meteor, $rootScope, $log) {

        if (null !== $rootScope.currentUser) {
            $scope.userForScore = $meteor.object(Userinfo, {user_id: $scope.getReactively($rootScope.currentUser._id)});
        }
        
        $scope.userScore = function(){
            if ($scope.userForScore === undefined || $scope.userForScore.score === undefined) {
                return 1;
            }
            return $scope.userForScore.score;
        };
    });