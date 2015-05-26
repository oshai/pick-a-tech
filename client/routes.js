angular.module("pick-a-tech").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('labels', {
        url: '/labels',
        templateUrl: 'client/labels/labels-list.ng.html',
        controller: 'LabelsListCtrl'
      })
      .state('labelDetails', {
        url: '/labels/:labelId',
        templateUrl: 'client/labels/label-details.ng.html',
        controller: 'LabelDetailsCtrl'
      })
      .state('newPick', {
    	  url: '/picks/new',
    	  templateUrl: 'client/picks/new-pick.ng.html',
    	  controller: 'NewPickCtrl'
      })
      .state('picks', {
    	  url: '/picks',
    	  templateUrl: 'client/picks/picks-list.ng.html',
    	  controller: 'PicksListCtrl'
      })
      .state('pickDetails', {
    	  url: '/picks/:pickId',
    	  templateUrl: 'client/picks/pick-details.ng.html',
    	  controller: 'PickDetailsCtrl'
      })
      .state('users', {
        url: '/users',
        templateUrl: 'client/users/users-list.ng.html',
        controller: 'UsersListCtrl'
      })
      ;

    $urlRouterProvider.otherwise("/picks");
  }]);