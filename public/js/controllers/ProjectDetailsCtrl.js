angular.module('ProjectDetailsCtrl', []).controller('ProjectDetailsController',['$scope', 'Project', '$routeParams', function($scope, Project, $routeParams) {

	$scope.tagline = 'The square root of life is pi!';

	Project.getDetails($routeParams.id).then(function(response) {
		console.log("Here");
        $scope.result = response.data;
        console.log(response.data);
    }, function(error) {
        console.log('opsssss' + error);
    });
}]);