angular.module('GeekService', []).factory('Geek', ['$http', function ($http) {
	return {
        // call to get all challenge
        getAll: function () {
        	console.log('Getting all');
            return $http.get('http://localhost:56782/Projects');
        },

        getOne: function(id) {
        	console.log('Getting Id: ' + id);
        	return $http.get('http://localhost:56782/Projects/' + id);
        }

        
    };
}]);