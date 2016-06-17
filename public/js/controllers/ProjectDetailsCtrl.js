angular.module('ProjectDetailsCtrl', []).controller('ProjectDetailsController',['$scope', 'Project', '$routeParams', function($scope, Project, $routeParams) {
	var projectId = $routeParams.id;
	$scope.headings = ["Role", "Name", "Hours"];
	Project.getDetails(projectId).then(function(response) {
		console.log("Here");
        $scope.project = response.data;
        defineRoles($scope.project.ActualRoles);
        console.log(response.data);
    }, function(error) {
        console.log('opsssss' + error);
    });

	var mainRoles = ["Project Manager","Project Coordinator", "Team Lead","Application Architect", "Creative Director", "QA Lead"];

    function defineRoles(roles){
    	var tempRolesList = [];
    	for (var i = 0; i < mainRoles.length; i++)
    	{
    		var foundRole = false;
    		for (var j = 0; j < roles.length; j++)
	    	{
	    		if (roles[j].Role == mainRoles[i])
	    		{
	    			// Found role
	    			tempRolesList.push(roles[j]);
	    			foundRole = true;
	    			break;
	    		}
	    	}
	    	if (!foundRole)
	    	{
	    		tempRolesList.push({Name:"Unstaffed in OA", Role: mainRoles[i], Hours: 0});
	    	}
    	}
    	$scope.project.ActualRoles = tempRolesList;
    }
}]);