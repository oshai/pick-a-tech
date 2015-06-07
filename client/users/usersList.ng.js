angular.module("pick-a-tech").controller("UsersListCtrl", ['$scope', '$meteor',
    function ($scope, $meteor) {

        $scope.users = $scope.$meteorCollection(Meteor.users, false).subscribe('users');
        $scope.picks = $scope.$meteorCollection(Picks).subscribe('picks');
        $scope.comments = $scope.$meteorCollection(Comments).subscribe('comments');
        $scope.userinfo = $scope.$meteorCollection(Userinfo).subscribe('userinfo');

        $scope.name = function (user) {
            return user.emails[0].address.substring(0, user.emails[0].address.indexOf('@'));
        }
        $scope.score = function (user) {
            var id = user._id;
            var res = 1;
            $scope.userinfo.forEach(function(info){
                if (info.user_id === id) {
                    res = info.score;
                }
            });
            return res;
        };
    }]);