module.exports = function ($stateProvider) {
    $stateProvider
        .state('snippet', {
            url: '/snippet',
            templateUrl: '/app/engines/snippet/main.html',
            controller: function ($state) {
                if ($state.current.name == 'snippet') {
                    $state.go('snippet.overview');
                }
            }
        })
        .state('snippet.overview', {
            url: '/overview',
            templateUrl: '/app/engines/snippet/overview/views/index.html',
            controller: 'OverviewController',
            resolve: {

                getSnippets: function (Restangular) {
                    return Restangular.one('/snippets').get();
                },
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'callburnApp',
                        files: [
                            '/app/engines/snippet/overview/controllers/OverviewController.js',
                            '/app/engines/snippet/services/SnippetServices.js'
                        ]
                    });
                }]
            }
        })
        .state('snippet.createsnippet', {
            url: '/create-snippet',
            templateUrl: '/app/engines/snippet/crud/views/index.html',
            controller: 'SnippetCRUDController',
            resolve: {

                callRoutes: function (Restangular) {
                    return Restangular.one('data/call-routes').get();
                },
                editSnippet: function () {
                    return false;
                },
                timezones: function (Restangular) {
                    return Restangular.one('data/timezones').get();
                },
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'callburnApp',
                        files: [
                            '/app/engines/snippet/crud/controllers/SnippetCRUDController.js',
                            '/app/engines/account/settings/services/SettingsService.js',
                            '/app/engines/snippet/services/SnippetServices.js',
                            '/app/engines/snippet/services/SnippetCrudDataService.js',
                        ]
                    });
                }]
            }
        }).state('snippet.edit', {
        url: '/edit-snippet/:_id?',
        templateUrl: '/app/engines/snippet/crud/views/index.html',
        controller: 'SnippetCRUDController',
        resolve: {

            callRoutes: function (Restangular) {
                return Restangular.one('data/call-routes').get();
            },
            editSnippet: function (Restangular, $stateParams) {
                return Restangular.one('snippets/' + $stateParams._id).get($stateParams);
            },
            timezones: function (Restangular) {
                return Restangular.one('data/timezones').get();
            },
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'callburnApp',
                    files: [
                        '/app/engines/snippet/crud/controllers/SnippetCRUDController.js',
                        '/app/engines/account/settings/services/SettingsService.js',
                        '/app/engines/snippet/services/SnippetServices.js',
                        '/app/engines/snippet/services/SnippetCrudDataService.js',
                    ]
                });
            }]
        }
    })
        .state('snippet.statistics', {
            url: '/statistics/:_id?',
            templateUrl: '/app/engines/snippet/statistics/views/index.html',
            controller: 'StatisticsController',
            resolve: {
                currentSnippet: function (Restangular, $stateParams) {

                    return Restangular.one('snippets/show-statistics/' + $stateParams._id).get();
                },

                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'callburnApp',
                        files: [
                            '/app/engines/snippet/statistics/controllers/StatisticsController.js',
                            '/app/engines/snippet/services/SnippetServices.js'
                        ]
                    });
                }]
            }
        })
        .state('snippet.test', {
            url: '/test',
            templateUrl: '/app/engines/snippet/statistics/test.html',
            controller: 'StatisticsController',
            resolve: {

                currentSnippet: function (Restangular, $stateParams) {

                    return Restangular.one('snippets/2').get($stateParams);
                },
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'callburnApp',
                        files: [
                            '/app/engines/snippet/statistics/controllers/StatisticsController.js',
                            '/app/engines/snippet/services/SnippetServices.js'
                        ]
                    });
                }]
            }
        })



};