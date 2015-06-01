angular.module("pick-a-tech").controller(
		"PickDetailsCtrl",
		function($scope, $stateParams, $meteor, $rootScope) {

			$scope.pick = $meteor.object(Picks, $stateParams.pickId).subscribe(
					'picks');

			$scope.descriptionVotesCount = function() {
				if (typeof $scope.pick.vote_up === 'undefined') {
					return 0;
				}
				return $scope.pick.vote_up.length
						- $scope.pick.vote_down.length;
			};
			$scope.style = function(color) {
				return {
					color : color
				};
			}
			$scope.getVoteColor = function(key) {
				var color = '#777';
				if ($rootScope.currentUser === 'undefined'
						|| $rootScope.currentUser === null) {
					return $scope.style(color);
				}
				if (key === 'description_vote_up'
						&& _.contains($scope.pick.vote_up,
								$rootScope.currentUser._id)) {
					color = '#9966FF';
				}
				if (key === 'description_vote_down'
					&& _.contains($scope.pick.vote_down,
							$rootScope.currentUser._id)) {
					color = '#9966FF';
				}
				return $scope.style(color);
			};
			$scope.vote = function(key) {
				 $meteor.call('vote', $scope.pick._id, $rootScope.currentUser._id, key).then(
						    function(data){
						      console.log('success vote', data);
						    },
						    function(err){
						      console.log('failed', err);
						    }
						  );
			};
		});