angular.module('ProjectCtrl', []).controller('ProjectController',['$scope', 'Project','$location', function($scope, Project, $location) {

	$scope.headings = ["Status","Project Name", "AM", "Baseline Hours", "Budget", "Client", "Currency"];
	$scope.projects = [];
	$scope.currentPage = 0;
    $scope.pageSize = 10;

	Project.get().then(function(response) {
        $scope.projects = response.data;
        $scope.numberOfPages = response.data.length;
    }, function(error) {
        console.log('Error:' + err);
    });

    $scope.go = function ( path ) {
		$location.path( path );
    };
}]);