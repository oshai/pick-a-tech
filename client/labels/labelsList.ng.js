angular.module("pick-a-tech").controller("LabelsListCtrl",
  function($scope, $meteor, $rootScope, $modal, $log){

    $scope.labels = $meteor.collection(Labels).subscribe('labels');

    $scope.remove = function(label){
      $scope.labels.splice( $scope.labels.indexOf(label), 1 );
    };
    $scope.createLabel = function(newLabel){
    	newLabel.owner=$rootScope.currentUser._id;
    	$scope.labels.save( newLabel );
    };

    $scope.openCreateModal = function () {
        $meteor.requireUser().then(function(){
            var modalInstance = $modal.open({
              animation: true,
              templateUrl: 'client/labels/edit/edit-label-modeal-content.ng.html',
              controller: 'NewLabelModalInstanceCtrl',
              size: 'lg'
    //          resolve: {
    //            items: function () {
    //              return $scope.items;
    //            }
    //          }
            });

            modalInstance.result.then(function (newLabel) {
                $scope.createLabel(newLabel);
            }, function () {
              $log.info('Modal dismissed(cancel) at: ' + new Date());
            });
          }, function(){
            Notifications.warn('Sign-In required!', 'Please sign in');
        })
    };

      
    $scope.removeAll = function(){
      $scope.labels.remove();
    };
});