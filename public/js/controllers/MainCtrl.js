angular.module('MainCtrl', []).controller('MainController',['$scope', 'Project', '$location',  function($scope, Project, $location) {
	var path = $location.path();
	if (path == '/')
	{
		$scope.isDashboardTab = true;
		$scope.isProjectsTab = false;
	} else if (path == '/projects')
	{
		$scope.isDashboardTab = false;
		$scope.isProjectsTab = true;
	}
	

}]);