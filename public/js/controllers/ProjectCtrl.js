angular.module('ProjectCtrl', []).controller('ProjectController',['$scope', 'Project', function($scope, Project) {

	$scope.tagline = 'The square root of life is pi!';
	Project.getAll().then(function(response) {
		console.log("Here");
        $scope.result = response.data;
        console.log(response.data);
    }, function(error) {
        console.log('opsssss' + error);
    });
}]);