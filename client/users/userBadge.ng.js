angular.module("pick-a-tech").controller("UserBadgeController",
    function ($scope, $meteor, $rootScope, $log) {

        $meteor.autorun($scope, function() {
            if (null !== Meteor.userId()) {
                $scope.userForScore = $scope.$meteorObject(Userinfo, {user_id: Meteor.userId()});
            }
        });

        $scope.userScore = function(){
            if ($scope.userForScore === undefined || $scope.userForScore.score === undefined) {
                return 1;
            }
            return $scope.userForScore.score;
        };
    });