angular.module("pick-a-tech").run(["$rootScope", "$state",  function($rootScope, $state) {
    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
        if (error === "AUTH_REQUIRED") {
            Notifications.warn('Sign-In required!', 'Please sign in');
        }
    });
}]);


angular.module("pick-a-tech").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function ($urlRouterProvider, $stateProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        var userBadgeView = {
            templateUrl: 'client/users/user-badge.ng.html',
            controller: 'UserBadgeController',
            resolve: {
                'subscribeUserinfo': [
                    '$meteor', function ($meteor) {
                        return $meteor.subscribe('userinfo');
                    }
                ],
                loggedIn: ['$rootScope', function ($rootScope) {
                    return $rootScope.currentUserPromise;
                }]
            }
        };
        $stateProvider
            .state('labels', {
                url: '/labels',
                views: {
                    'userBadge': userBadgeView,
                    'content': {
                        templateUrl: 'client/labels/labels-list.ng.html',
                        controller: 'LabelsListCtrl'
                    }
                }
            })
            .state('labelDetails', {
                url: '/labels/:labelId',
                views: {
                    'userBadge': userBadgeView,
                    'content': {
                        templateUrl: 'client/labels/label-details.ng.html',
                        controller: 'LabelDetailsCtrl'
                    }
                }
            })
            .state('newPick', {
                url: '/picks/new',
                views: {
                    'userBadge': userBadgeView,
                    'content': {
                        templateUrl: 'client/picks/new/new-pick.ng.html',
                        controller: 'NewPickCtrl',
                        resolve: {
                            "currentUser": ["$meteor", function($meteor){
                                return $meteor.requireUser();
                            }]
                        }
                    }
                }
            })
            .state('picks', {
                url: '/picks',
                views: {
                    'userBadge': userBadgeView,
                    'content': {
                        templateUrl: 'client/picks/picks-list.ng.html',
                        controller: 'PicksListCtrl'
                    }
                }
            })
            .state('pickDetails', {
                url: '/picks/:pickId/:pickTitle',
                views: {
                    'userBadge': userBadgeView,
                    'content': {
                        templateUrl: 'client/picks/details/pick-details.ng.html',
                        controller: 'PickDetailsCtrl',
                        resolve: {
                            'subscribePicks': [
                                '$meteor', function ($meteor) {
                                    return $meteor.subscribe('picks');
                                }
                            ],
                            'subscribeComments': [
                                '$meteor', function ($meteor) {
                                    return $meteor.subscribe('comments');
                                }
                            ],
                            'subscribeCandidates': [
                                '$meteor', function ($meteor) {
                                    return $meteor.subscribe('candidates');
                                }
                            ]
                        }
                    }
                }
            })
            .state('users', {
                url: '/users',
                views: {
                    'userBadge': userBadgeView,
                    'content': {
                        templateUrl: 'client/users/users-list.ng.html',
                        controller: 'UsersListCtrl'
                    }
                }
            })
            .state('about', {
                url: '/about',
                views: {
                    'userBadge': userBadgeView,
                    'content': {
                        templateUrl: 'client/about.ng.html',
                    }
                }
            })
            .state('notFound', {
                views: {
                    'userBadge': userBadgeView,
                    'content': {
                        templateUrl: 'client/404.ng.html'
                    }
                }
            })
        ;
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.when('/', '/picks');
        $urlRouterProvider.otherwise(function ($injector, $location) {
            $injector.invoke(['$state', function ($state) {
                $state.go('notFound');
            }]);
            return true;
        });
    }]);
