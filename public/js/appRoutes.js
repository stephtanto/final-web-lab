angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/project.html',
			controller: 'ProjectController'
		})

		.when('/nerds', {
			templateUrl: 'views/nerd.html',
			controller: 'NerdController'
		})

		.when('/projects', {
			templateUrl: 'views/project.html',
			controller: 'ProjectController'	
		})
		.when('/projects/:id', {
			templateUrl: 'views/details.html',
			controller: 'ProjectDetailsController'
		})

	$locationProvider.html5Mode(true);

}]);