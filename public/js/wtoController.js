worldTourApp.controller('wtoController', function($scope, $rootScope, $state, $timeout, $sce, $http, $window) {
	console.log("controller");

	$(document).ready(function(){
      $('.parallax').parallax();
    });

	$scope.mainLabels = ["Crowdsale Investors", "Bounty & rewards", "Founders", "Research and Promotion"];
	$scope.mainData = [70, 5, 10, 15];
	$scope.mainColors = ["#204f84","#53a8e2","#50e3c2","#dbecf8"];
});