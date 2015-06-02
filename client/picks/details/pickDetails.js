angular.module("pick-a-tech").controller("PickDetailsCtrl",
    function ($scope, $stateParams, $meteor, $rootScope, $modal, $log) {

        $scope.pick = $meteor.object(Picks, $stateParams.pickId);
        $scope.comments = $meteor.collection(Comments);
        $scope.labels = {};
        $scope.candidates = [];
        $scope.allCandidates = $meteor.collection(Candidates);
        $scope.allCandidates.forEach(function (c) {
            if (c.pick_id === $scope.pick._id) {
                var label = $meteor.object(Labels, c.label_id).subscribe('labels');
                $scope.labels[c.label_id] = label;
                c.pros_cons = [];
                $scope.comments.forEach(function (comment) {
                    if (comment.candidate_id === c._id) {
                        c.pros_cons.push(comment);
                    }
                });
                $scope.candidates.push(c);
            }
        });

        $scope.descriptionVotesCount = function () {
            return $scope.pick.vote_up.length - $scope.pick.vote_down.length;
        };
        $scope.style = function (color) {
            return {
                color: color
            };
        }
        $scope.getVoteColor = function (key) {
            var color = '#777';
            if ($rootScope.currentUser === 'undefined' || $rootScope.currentUser === null) {
                return $scope.style(color);
            }
            if (key === 'description_vote_up' && _.contains($scope.pick.vote_up, $rootScope.currentUser._id)) {
                color = '#9966FF';
            }
            if (key === 'description_vote_down' && _.contains($scope.pick.vote_down, $rootScope.currentUser._id)) {
                color = '#9966FF';
            }
            return $scope.style(color);
        };
        $scope.vote = function (key, id) {
            $meteor.call('vote', $scope.pick._id, $rootScope.currentUser._id, key, id).then(function (data) {
                console.log('success vote', data);
            }, function (err) {
                console.log('failed', err);
            });
        };
        $scope.getLabelName = function (label_id) {
            return $scope.labels[label_id].name;
        };
        $scope.voteUpPercent = function (candidate) {
            var num = candidate.vote_up.length;
            if (num === 0) {
                return '0%';
            }
            var total = 0;
            $scope.candidates.forEach(function (c) {
                total += c.vote_up.length;
            });
            return Math.floor(num / total).toString + '%';
        };
        $scope.openProConModal = function (candidate) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'client/picks/details/edit-pro-con-modeal-content.ng.html',
                controller: 'NewProConModalInstanceCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function (proCon) {
                candidate.pros_cons.push({vote_up: [], vote_down: [], content: proCon});
            }, function () {
                $log.info('Modal dismissed(cancel) at: ' + new Date());
            });

        };
    });