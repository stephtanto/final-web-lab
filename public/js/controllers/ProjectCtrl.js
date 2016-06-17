angular.module('ProjectCtrl', []).controller('ProjectController',['$scope', 'Project', function($scope, Project) {

	$scope.headings = ["Status","Project Name", "AM", "Baseline Hours", "Budget", "Client", "Currency"];
	$scope.projects = [];

	Project.get().then(function(response) {
        $scope.projects = response.data;
        console.log($scope.result);
    }, function(error) {
        console.log('Error:' + err);
    });
}]);