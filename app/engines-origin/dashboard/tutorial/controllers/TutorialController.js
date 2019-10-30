angular.module('callburnApp').controller('TutorialController', 
	[ 		'$scope', '$rootScope', '$state','dashboardData',
	function($scope,   $rootScope,   $state ,dashboardData){
		$rootScope.showNavbar = true;
		$rootScope.stepTutorial = $rootScope.checkAccessBeta ? 1 : 3;
		angular.element("a").click(function (e) {
			e.preventDefault();
		});
		$scope.dashboardData = dashboardData.resource;
		$scope.changeStepTutorial = function (step) {
			$rootScope.stepTutorial = step;
		};
		//$rootScope.showBlurEffect=true;

}]);