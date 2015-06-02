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
    	  templateUrl: 'client/picks/new/new-pick.ng.html',
    	  controller: 'NewPickCtrl'
      })
      .state('picks', {
    	  url: '/picks',
    	  templateUrl: 'client/picks/picks-list.ng.html',
    	  controller: 'PicksListCtrl'
      })
      .state('pickDetails', {
    	  url: '/picks/:pickId/:pickTitle',
    	  templateUrl: 'client/picks/details/pick-details.ng.html',
    	  controller: 'PickDetailsCtrl',
    	  resolve: {
    	      'subscribePicks': [
    	        '$meteor', function($meteor) {
    	          return $meteor.subscribe('picks');
    	        }
    	      ],
    	      'subscribeComments': [
    	        '$meteor', function($meteor) {
    	          return $meteor.subscribe('comments');
    	        }
    	      ],
              'subscribeCandidates': [
                  '$meteor', function($meteor) {
                      return $meteor.subscribe('candidates');
                  }
              ]
    	    }
      })
      .state('users', {
        url: '/users',
        templateUrl: 'client/users/users-list.ng.html',
        controller: 'UsersListCtrl'
      })
      .state('notFound', {
        templateUrl: 'client/404.ng.html'
      })
      ;
    $urlRouterProvider.when('', '/');
    $urlRouterProvider.when('/', '/picks');
    $urlRouterProvider.otherwise(function ($injector, $location) {
        $injector.invoke(['$state', function ($state) { $state.go('notFound'); }]);
        return true;
    });
  }]);