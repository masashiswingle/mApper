angular.module('App', ['ngRoute', 'ngMap', 'Game'])
.config(function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: '/app/info.html'
	})
	.when('/game', {
		templateUrl: '/app/game.html',
		controller: 'gameController'
	})
	.otherwise({
		redirectTo: '/game'
	})
})
.controller('mapController', ['$scope', 'Map', function ($scope, Map){
	$scope.count = 0; 
	$scope.compareAnswer = function (answer){
		console.log(answer.answer)
		if ($scope.answer === answer.answer){
			$scope.count++;
			console.log($scope.count);
		}
	}
	$scope.StartGame = function(){
		Map.getMaps(function(result){
			console.log('start game function', result);
			$scope.lat = result.position.lat;
			$scope.lng = result.position.lng; 
			$scope.answer = result.answer; 
			$scope.poi = result.poi;
			$scope.answerChoices = result.answerChoices;
	})
}
}])

//{
  // position: {lat: 36.2048, lng: 138.2529},
  // answer:'Chicago',
  // poi:'Navy Pier',
  // otherAnswers: ['London', 'Istanbul', 'San Francisco', 'New York City']
  // }



.factory('Map', function ($http){
		var getMaps = function (callback){
			$http.get('/newGame').success(function(result){ //enter express URL
				console.log('map factory', result)
				callback(result);
			})
		};
		return {getMaps: getMaps};
});
