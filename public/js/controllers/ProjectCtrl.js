angular.module('ProjectCtrl', []).controller('ProjectController',['$scope', 'Project','$location','filterFilter', '$timeout', function($scope, Project, $location, filterFilter, $timeout) {
	
    // Scope Variables
    $scope.model = {};
    $scope.pageOptions;
	$scope.headings;
	$scope.projects;
    $scope.filteredProjects;
	$scope.currentPage;
    $scope.pageSize;
	$scope.totalPages;
	$scope.hidePagination;
	$scope.statusList;
	$scope.practiceListNames;
	$scope.practiceListValues;
    $scope.showDashboard;
    $scope.isLoaded;

    // Initialization Function
    $scope.init = function (){
        $scope.model = {};
        $scope.pageOptions = [{value:"5"},{value:"10"},{value:"25"}, {value: "All"}];
        $scope.headings = ["Status","Project Name", "AM", "Baseline Hours", "Budget", "Client", "Currency"];
        $scope.projects = [];
        $scope.filteredProjects = [];
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.totalPages = 0;
        $scope.hidePagination = false;
        $scope.statusList = [];
        $scope.practiceListNames = [];
        $scope.practiceListValues = [];
        $scope.showDashboard = true;
        $scope.isLoaded = false;
        Project.get().then(function(response) {
            $scope.projects = response.data;
            $scope.filteredProjects = response.data;
            $scope.totalPages = response.data.length;
            $scope.numberOfPages();
            var path = $location.path();
            if (path == '/')
            {
                generateChart($scope.filteredProjects);
                generatePracticeChart($scope.filteredProjects);   
            }
            $scope.load();
        }, function(error) {
            console.log('Error:' + err);
        });
    }

    $scope.init();

    $scope.load = function () {
        $scope.isLoaded = true;
    }

    $scope.go = function (path) 
    {
        $location.path( path );
    };

    //Pagination Functionality
	$scope.numberOfPages = function(){
		var size = $scope.totalPages / $scope.pageSize
		return (size < 1) ? 1 : size;
	} 

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

    //Search Functionality
    var searchTextTimeout = "";
    $scope.search = function(searchText){
        if (searchTextTimeout) $timeout.cancel(searchTextTimeout);

        searchTextTimeout = $timeout(function() {
            $scope.updateSearch(searchText);
        }, 500);
    }

    $scope.updateSearch = function(searchText){
    	$scope.searchText = searchText
    	var projects = filterFilter($scope.filteredProjects, searchText);
        $scope.filteredProjects = projects;
    	$scope.totalPages = projects.length;
    	$scope.currentPage = 0;
    	generateChart(projects)
    }

    //Chart Functionality
    // 1. Form data
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
    }

    // 2. Generate Chart
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
		        	label: "Number of Projects",
		            data: $scope.practiceListValues,
		            hoverBackgroundColor: 'red',
		            backgroundColor: 'darkred',
		            borderWidth: 1
		        }]
		    }
		});
    }
}]);