angular.module('ProjectService', []).factory('Project', ['$http', function ($http) {
	return {

        // call to get all data
        get: function () {
            return $http.get('http://stephaniewebapi.azurewebsites.net/Projects');
            //return $http.get('http://localhost:56782/Projects');
        },

        // call to DELETE a project
        getDetails: function (id) {
            return $http.get('http://stephaniewebapi.azurewebsites.net/Projects/' + id);
        },

        addProject: function(p) {
            return $http.post('http://localhost:56782/Projects', p);
        }

    };
}]);