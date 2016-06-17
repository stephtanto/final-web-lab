angular.module('MainCtrl', []).controller('MainController',['$scope', 'Geek', function($scope, Geek) {

	$scope.tagline = 'To the moon and back!';	
	Geek.getData().then(function(response) {
			console.log('we got it');
			console.log(response);
		});
}]);