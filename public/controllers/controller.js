var myApp = angular.module("myApp", []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
	console.log("Hello World from controller");


var refresh = function() {
	$http.get('/incidents').success(function(response) {
		console.log("got the data");
		$scope.incidents=response;
		$scope.incident = $scope.initial;
	});
};

refresh();

$scope.addIncident = function(){
	console.log($scope.incident);
	$http.post('/incidents', $scope.incident).success(function(response) {
		console.log(response);
		refresh();
	});
};

$scope.remove = function(id) {
	console.log(id);
	$http.delete('/incidents/'+ id).success(function(response) {
		refresh();	
	});
};

$scope.edit = function(id) {
	console.log(id);
	$http.get('/incidents/'+ id).success(function(response) {
		$scope.incident = response;
	});
};

$scope.update = function() {
	console.log($scope.incident._id);
	$http.put('/incidents/'+ $scope.incident._id, $scope.incident).success(function(response) {
		refresh()
	});
};

$scope.deselect = function() {
	$scope.incident='';
};

}]);