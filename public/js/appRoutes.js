angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/dashboard.html',
			controller: 'ProjectController'
		})
		.when('/projects', {
			templateUrl: 'views/projects.html',
			controller: 'ProjectController'	
		})
		.when('/projects/:id', {
			templateUrl: 'views/details.html',
			controller: 'ProjectDetailsController'
		})

	$locationProvider.html5Mode(true);

}]);