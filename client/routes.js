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
      .state('users', {
        url: '/users',
        templateUrl: 'client/users/users-list.ng.html',
        controller: 'UsersListCtrl'
      })
      ;

    $urlRouterProvider.otherwise("/labels");
  }]);