angular.module('callburnApp').controller('StarterController',
    ['$scope', '$rootScope', '$state', '$stateParams',
    function($scope, $rootScope, $state, $stateParams) {

    $rootScope.currentPage = 'dashboard';
    $rootScope.currentActiveRoute = null;

}]);