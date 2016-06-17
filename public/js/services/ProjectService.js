angular.module('ProjectService', []).factory('Project', ['$http', function ($http) {
	return {
        // call to get all data
        get: function () {
        	console.log('hi');
            return $http.get('http://stephaniewebapi.azurewebsites.net/api/projects/');
        },

        // call to DELETE a project
        delete: function (id) {
            return $http.delete('/api/challenges/' + id);
        }

    };
}]);