angular.module('GeekService', []).factory('Geek', ['$http', function ($http) {
	return {
        // call to get all challenge
        get: function () {
        	console.log('hi');
            return $http.get('http://stephaniewebapi.azurewebsites.net/api/projects/');
        },

        // call to get all challenge
        getOneChallenge: function (id) {
            return $http.get('/api/oneChallenge/' + id);
        },

        // call to get userId
        getUserId: function (username) {
            return $http.get('/api/userInfo/' + username);
        },

        // call to get userId
        getUser: function (userId) {
            return $http.get('/api/userFromId/' + userId);
        },

        // call to get all user's challenge
        getUserChallenges: function (userId) {
            return $http.get('/api/userChallenges/' + userId);
        },

        // call to get all user's challenge
        getAllFromChallenge: function (challengeId, startDate, start) {
            console.log('getall', startDate, start);
            return $http.post('/api/allChallenges/' + challengeId, {startDate:startDate, start:start});
        },

        // call to POST and create a new challenge
        create: function (challengeData) {
            return $http.post('/api/challenges', challengeData);
        },

        // call to DELETE a challenge
        delete: function (id) {
            return $http.delete('/api/challenges/' + id);
        },

        // call to DELETE a challenge mapping
        deleteMapping: function (id) {
            return $http.delete('/api/challengeMapping/' + id);
        },

        // call to MODIFY a challenge
        complete: function (id, userId, challengeData) {
            return $http.put('/api/challenges/complete/' + id, {
                challengeData: challengeData,
                userId: userId
            });
        },

        // call to START a challenge
        start: function (id) {
            return $http.put('/api/challenges/start/' + id);
        },

        // call to START DATE a challenge
        setStartDate: function (id, date) {
            return $http.put('/api/challenges/startDate/' + id, {date : date});
        },
        // call to STOP a challenge
        stop: function (id) {
            return $http.put('/api/challenges/stop/' + id);
        },
        // call to STOP a challenge
        stopChallenge: function (id) {
            return $http.put('/api/challenges/stopChallenge/' + id);
        },

        // add challenge mappings
        mapChallenges: function (data) {
            return $http.post('/api/ChallengeMapping', data);
        }
    };
}]);