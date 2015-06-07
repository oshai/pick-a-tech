angular.module("pick-a-tech").controller("PickDetailsCtrl",
    function ($scope, $stateParams, $meteor, $rootScope, $modal, $log) {

        $scope.pick = $scope.$meteorObject(Picks, $stateParams.pickId);
        $scope.comments = $scope.$meteorCollection(Comments);
        $scope.labels = {};
        $scope.candidates = [];
        $scope.allCandidates = $scope.$meteorCollection(Candidates);
        $scope.allCandidates.forEach(function (c) {
            if (c.pick_id === $scope.pick._id) {
                var label = $scope.$meteorObject(Labels, c.label_id).subscribe('labels');
                $scope.labels[c.label_id] = label;
                $scope.candidates.push(c);
            }
        });

        $scope.descriptionVotesCount = function () {
            return $scope.pick.vote_up.length - $scope.pick.vote_down.length;
        };
        $scope.commentVotesCount = function (comment) {
            return comment.vote_up.length - comment.vote_down.length;
        };
        $scope.style = function (color) {
            return {
                color: color
            };
        }
        $scope.getVoteColor = function (key, object) {
            var color = '#777';
            if ($rootScope.currentUser === 'undefined' || $rootScope.currentUser === null) {
                return $scope.style(color);
            }
            if (key === 'vote_up' && _.contains(object.vote_up, $rootScope.currentUser._id)) {
                color = '#9966FF';
            }
            if (key === 'vote_down' && _.contains(object.vote_down, $rootScope.currentUser._id)) {
                color = '#9966FF';
            }
            return $scope.style(color);
        };
        $scope.vote = function (key, id) {
            $meteor.call('vote', $scope.pick._id, $rootScope.currentUser._id, key, id).then(function (data) {
                console.log('success vote', data);
            }, function (err) {
                console.log('failed', err);
                Notifications.warn('Error', err.reason);
            });
        };
        $scope.getLabelName = function (label_id) {
            return $scope.labels[label_id].name;
        };
        $scope.voteUpPercent = function (candidate) {
            var num = candidate.vote_up.length;
            if (num === 0) {
                return 0;
            }
            var total = 0;
            $scope.candidates.forEach(function (c) {
                total += c.vote_up.length;
            });
            return Math.floor(num * 100 / total);
        };
        $scope.commentsOf = function (candidate) {
            var res = [];
            $scope.comments.forEach(function(comment){
                if (comment.candidate_id === candidate._id){
                    res.push(comment);
                }
            });
            return res;
        }
        $scope.openProConModal = function (candidate) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'client/picks/details/edit-pro-con-modal-content.ng.html',
                controller: 'NewProConModalInstanceCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function (proCon) {
                $scope.comments.push({candidate_id: candidate._id, vote_up: [], vote_down: [], content: proCon, owner: $rootScope.currentUser._id});
            }, function () {
                $log.info('Modal dismissed(cancel) at: ' + new Date());
            });

        };
    });