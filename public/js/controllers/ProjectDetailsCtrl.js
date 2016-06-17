angular.module('ProjectDetailsCtrl', []).controller('ProjectDetailsController',['$scope', 'Project', '$routeParams', function($scope, Project, $routeParams) {
	var projectId = $routeParams.id;

	Project.getDetails(projectId).then(function(response) {
		console.log("Here");
        $scope.project = response.data;
        console.log(response.data);
    }, function(error) {
        console.log('opsssss' + error);
    });


}]);