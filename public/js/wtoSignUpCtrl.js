worldTourApp.controller('wtoSignUpCtrl', function($scope, $rootScope, $state, $timeout, $sce, $http, $window) {
	$scope.state = $state;
	console.log('signUp ctrl');

	$scope.registerObj = {};

	$scope.register = function(){
		var postObj = angular.copy($scope.registerObj);
		delete postObj.pass;

		console.log(postObj);

		$http.post('http://api.worldtourism.io:8080/tourcoins/createAccount',postObj).then(success,error);

		function success(res){
			console.log("res",res);
			if (res.data.success) {
				$state.go('verify');
			}else if(res.data.error == "verify email"){
				Materialize.toast("You are already registered, Please verify email", 3000);
				$scope.registerObj = {};
			}else{
				Materialize.toast(res.data.error, 3000);
				$scope.registerObj = {};
			}
		}

		function error(err){
			alert(err);
		}
	}

	$scope.comparePass = function(){
		if ($scope.registerObj.pass !== $scope.registerObj.userPassword) {
			$scope.matchError = "Passwords don't match";
		}else{
			$scope.matchError = '';
		}
	}
});