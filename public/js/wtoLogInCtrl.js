worldTourApp.controller('wtoLogInCtrl', function($scope, $rootScope, $state, $timeout, $sce, $http, $window) {
	$scope.state = $state;
	console.log('login ctrl');
	$scope.loginObj = {};

	$scope.login = function(){
		var postObj = angular.copy($scope.loginObj);

		// $http.post('http://api.worldtourism.io:8080/tourcoins/loginAuth',postObj).then(success,error);
		$http.post('https://api.worldtourism.io/tourcoins/loginAuth',postObj).then(success,error);

		function success(res){
			console.log(res);
			if (res.data.success =='success') {
				$window.localStorage.wtoUserData = JSON.stringify(res.data.userData);
				$state.go('dashboard');
			}else if(res.data.error){
				Materialize.toast(res.data.error, 3000);
			}
		}

		function error(err){
			alert(err);
		}
	}
});