angular.module('App', ['ngRoute', 'ngMap', 'Game'])
.config(function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: '/app/info.html'
	})
	.when('/game', {
		templateUrl: '/app/game.html',
		controller: 'gameController'
	})
})
.controller('mapController', ['$scope', 'Map', '$http', function ($scope, Map){

$scope.StartGame = function(){
	Map.getMaps(function(result){
		console.log('start game function', result);
		$scope.lat = result[0];
		$scope.lng = result[1]; 
	})
}
}])
.factory('Map', function ($http){
		var getMaps = function (callback){
			var testUrl;
			$http.get('/newGame').success(function(result){ //enter express URL
				console.log('map factory', result)
				callback(result);
			})
		};
		return {getMaps: getMaps};
});