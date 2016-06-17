angular.module('GeekCtrl', []).controller('GeekController',['$scope', 'Geek', function($scope, Geek) {

	$scope.tagline = 'The square root of life is pi!';	


	Geek.get().then(function(response) {
        $scope.result = response.data;
    }, function(error) {
        console.log('opsssss' + error);
    });
}]);