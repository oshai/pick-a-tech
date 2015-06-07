angular.module("pick-a-tech").controller("UsersListCtrl", ['$scope', '$meteor',
    function ($scope, $meteor) {

        $scope.users = $scope.$meteorCollection(Meteor.users, false).subscribe('users');
        $scope.picks = $scope.$meteorCollection(Picks).subscribe('picks');
        $scope.comments = $scope.$meteorCollection(Comments).subscribe('comments');

        $scope.name = function (user) {
            return user.emails[0].address.substring(0, user.emails[0].address.indexOf('@'));
        }
        $scope.score = function (user) {
            //$meteor.call('vote', $scope.pick._id, $rootScope.currentUser._id, key, id).then(function (data) {
            //    console.log('success vote', data);
            //}, function (err) {
            //    console.log('failed', err);
            //});
            var result = 0;
            var id = user._id;
            $scope.picks.forEach(function(pick){
                if (pick.owner !== id) {
                    return;
                }
                result += 5 * (pick.vote_up.length - pick.vote_down.length);
            });
            $scope.comments.forEach(function(comment){
                if (comment.owner !== id) {
                    return;
                }
                result += 10 * (comment.vote_up.length - comment.vote_down.length);
            });
            if (result < 1) {
                return 1;
            }
            return result;
        };
    }]);