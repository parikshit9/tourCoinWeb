worldTourApp.controller('wtoController', function($scope, $rootScope, $state, $timeout, $sce, $http, $window) {
	console.log("controller");

	$(document).ready(function(){
      $('.parallax').parallax();
    });

	$scope.mainLabels = ["Crowdsale Investors", "Bounty & rewards", "Founders", "Research and Promotion"];
	$scope.mainData = [70, 5, 10, 15];
	$scope.mainColors = ["#204f84","#53a8e2","#50e3c2","#dbecf8"];

	$scope.subscribeMail = function(id){
		var postObj = {
			"subscriptionEmailId" : id
		}

		$http.post('http://ec2-18-216-197-240.us-east-2.compute.amazonaws.com:8080/tourcoins/subscribeTourCoins',postObj).then(success,error);

		function success(res){
			console.log(res);
			if (res.data.subscriptionStatus) {
				Materialize.toast('Subscribed Succesfully!', 4000);
				$scope.mailId = null;
			}
		}

		function error(err){
			console.log(err);
		}
	}
});