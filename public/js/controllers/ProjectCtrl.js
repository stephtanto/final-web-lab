angular.module('ProjectCtrl', []).controller('ProjectController',['$scope', 'Project','$location','filterFilter', function($scope, Project, $location, filterFilter) {
	$scope.model = {};
    $scope.pageOptions = [{value:"5"},{value:"10"},{value:"25"}, {value: "All"}];
	$scope.headings = ["Status","Project Name", "AM", "Baseline Hours", "Budget", "Client", "Currency"];
	$scope.projects = [];
	$scope.currentPage = 0;
    $scope.pageSize = 10;
	$scope.totalPages = 0;
	$scope.hidePagination = false;
	$scope.statusList = [];
	$scope.practiceListNames = [];
	$scope.practiceListValues = [];
	$scope.numberOfPages = function(){
		var size = $scope.totalPages / $scope.pageSize
		return (size < 1) ? 1 : size;
	} 

	Project.get().then(function(response) {
        $scope.projects = response.data;
        $scope.totalPages = response.data.length;
        $scope.numberOfPages();
        generateChart($scope.projects);
        generatePracticeChart($scope.projects);
    }, function(error) {
        console.log('Error:' + err);
    });

    $scope.go = function (path) 
    {
		$location.path( path );
    };

    $scope.updatePageSettings = function ()
    {
    	$scope.currentPage = 0;
    	if ($scope.selectedPageSize.value === "All")
    	{
    		$scope.pageSize = $scope.totalPages;
    		$scope.hidePagination = true;
    	}
    	else {
    		$scope.pageSize = parseInt($scope.selectedPageSize.value);
    		$scope.hidePagination = false;
    	}
    	
    }

    $scope.updateSearch = function(searchText){
    	var projects = filterFilter($scope.projects, searchText);
    	$scope.totalPages = projects.length;
    	$scope.currentPage = 0;
    	console.log('projects', projects.length);
    }

    function getStatusData(projects){
    	var statusHash = {};
    	statusHash["Red"]= 0;
		statusHash["Amber"]= 0;
		statusHash["Green"]= 0;
		statusHash["Unknown"]= 0;
    	for (var i = 0; i < projects.length; i++)
    	{
    		if (projects[i].State === "Red")
    		{
    			statusHash["Red"] =statusHash["Red"] + 1;
    		} else if (projects[i].State === "Amber")
    		{
    			statusHash["Amber"] = statusHash["Amber"] +  1;
    		} else if (projects[i].State === "Green")
    		{
    			statusHash["Green"]  = statusHash["Green"] +  1;
    		} else
    		{
    			statusHash["Unknown"] = statusHash["Unknown"] +  1;
    		} 
    	}
    	console.log([statusHash["Red"], statusHash["Amber"], statusHash["Green"], statusHash["Unknown"]]);
    	$scope.statusList = [statusHash["Red"], statusHash["Amber"], statusHash["Green"], statusHash["Unknown"]];
    }

    function getPracticeData(projects) {
    	var practiceHash = {};
    	practiceHash["Web"] = 0;
    	practiceHash["Enterprise"] = 0;
    	practiceHash["Smart Client"] = 0;
    	practiceHash["Financial Services"] = 0;
    	practiceHash["Support"] = 0;
    	practiceHash["Other"] = 0;
    	for (var i = 0; i < projects.length; i++) {
    		if (practiceHash[projects[i].ProjectPractice] == undefined) {
    			practiceHash["Other"] += 1;
    		}
    		else {
    			practiceHash[projects[i].ProjectPractice] += 1;
    		}
    	}

    	$scope.practiceListNames = Object.keys(practiceHash);
    	$scope.practiceListValues = $scope.practiceListNames.map(function(name) { return practiceHash[name]; })
    	console.log($scope.practiceListNames);
    }
    //Chart

    function generateChart(projects){
    	getStatusData(projects);
    	var ctx = document.getElementById("dataChartStatus");
		var myChart = new Chart(ctx, {
		    type: 'pie',
		    data: {
		        labels: ["Red", "Amber", "Green", "Unknown"],
		        datasets: [{
		            data: $scope.statusList,
		            hoverBackgroundColor: [
		                'rgba(221, 29, 29, 0.65)',
		                'rgba(255, 186, 0, 0.54)',
		                'rgba(75, 142, 25, 0.66)',
		                'darkgray'
		            ],
		            backgroundColor: [
		                '#dd1d1d',
		                '#FFBA00',
		                '#4b8e19',
		                'gray'
		            ],
		            borderWidth: 1
		        }]
		    }
		});
    }

     function generatePracticeChart(projects){
    	getPracticeData(projects);
    	var ctx = document.getElementById("dataChartPractice");
		var myChart = new Chart(ctx, {
		    type: 'bar',
		    data: {
		        labels: $scope.practiceListNames,
		        datasets: [{
		        	label: "Number of clients",
		            data: $scope.practiceListValues,
		            hoverBackgroundColor: 'red',
		            backgroundColor: 'darkred',
		            borderWidth: 1
		        }]
		    }
		});
    }


}]);