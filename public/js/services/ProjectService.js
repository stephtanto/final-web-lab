angular.module('ProjectService', []).factory('Project', ['$http', function ($http) {
	return {
        // call to get all data
        get: function () {
            return $http.get('http://stephaniewebapi.azurewebsites.net/projects/');
        }

    };
}]);