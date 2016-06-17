angular.module('ProjectCtrl', []).controller('ProjectController',['$scope', 'Project','$location','filterFilter', function($scope, Project, $location, filterFilter) {
	$scope.model = {};
    $scope.pageOptions = [{value:"5"},{value:"10"},{value:"25"}, {value: "All"}];
	$scope.headings = ["Status","Project Name", "AM", "Baseline Hours", "Budget", "Client", "Currency"];
	$scope.projects = [];
	$scope.currentPage = 0;
    $scope.pageSize = 10;
	$scope.totalPages = 0;
	$scope.hidePagination = false;
	$scope.numberOfPages = function(){
		var size = $scope.totalPages / $scope.pageSize
		return (size < 1) ? 1 : size;
	} 

	Project.get().then(function(response) {
        $scope.projects = response.data;
        $scope.totalPages = response.data.length;
        $scope.numberOfPages();
    }, function(error) {
        console.log('Error:' + err);
    });

    $scope.go = function (path) 
    {
		$location.path( path );
    };

    $scope.updatePageSettings = function ()
    {
    	$scope.currentPage = 0;
    	if ($scope.selectedPageSize.value === "All")
    	{
    		$scope.pageSize = $scope.totalPages;
    		$scope.hidePagination = true;
    	}
    	else {
    		$scope.pageSize = parseInt($scope.selectedPageSize.value);
    		$scope.hidePagination = false;
    	}
    	
    }

    $scope.updateSearch = function(searchText){
    	var projects = filterFilter($scope.projects, searchText);
    	$scope.totalPages = projects.length;
    	$scope.currentPage = 0;
    	console.log('projects', projects.length);
    }
}]);