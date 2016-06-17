angular.module('ProjectCtrl', []).controller('ProjectController',['$scope', 'Project', function($scope, Project) {

	$scope.tagline = 'The square root of life is pi!';	


	Project.get().then(function(response) {
        $scope.result = response.data;
    }, function(error) {
        console.log('opsssss' + error);
    });
}]);