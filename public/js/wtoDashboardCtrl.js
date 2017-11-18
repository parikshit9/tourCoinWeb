worldTourApp.controller('wtoDashboardCtrl', function($scope, $rootScope, $state, $timeout, $sce, $http, $window) {
	$scope.state = $state;
	console.log('Dashboard ctrl');

	$(document).ready(function(){
		$('.parallax').parallax();
		$('.collapsible').collapsible();
		$('.scrollspy').scrollSpy();
        $(".dropdown-button").dropdown();
        $(".button-collapse").sideNav(
            {
              closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
            }
        );
		$('.scrollspy').on('scrollSpy:enter', function() {
			$('.wto-fixed-nav').find('a').removeClass('anchor-active');
			$('.wto-fixed-nav').find('a[href="#'+$(this).attr('id')+'"]').addClass('anchor-active');
		});
		// $('scrollspy').on('scrollSpy:exit', function(){
		// 	console.log('getting');
		// 	$('.wto-fixed-nav').find('a[href="#'+$(this).attr('id')+'"]').parent().removeClass('active');
		// });
    });

	$scope.fetchData = function(){
		var postObj = {};
		postObj.userId = $scope.userData.userId;

		console.log(postObj);

		// $http.post('http://api.worldtourism.io:8080/tourcoins/dataOnDashboard',postObj).then(success,error);
		$http.post('https://api.worldtourism.io/tourcoins/dataOnDashboard',postObj).then(success,error);

		function success(res){
			console.log("res",res.data.data);
			if (res.data.data) {
				$scope.dashData = res.data.data;
				if ($scope.dashData.userWallet.bitcoin.walletId == '') {
					$scope.btcFlag = false;
				}else{
					$scope.btcFlag = true;
				}
				if ($scope.dashData.userWallet.eherium.walletId == '') {
					$scope.ethFlag = false;
				}else{
					$scope.ethFlag = true;
				}
			}
		}

		function error(err){
			console.log(err);
		}
	}
	
	if (!$window.localStorage.wtoUserData) {
		$state.go('home');
	}else{
		$scope.userData = JSON.parse($window.localStorage.wtoUserData);
		$scope.fetchData();
	}

	console.log($scope.userData);

	$scope.addWalletId = function(type,id){
		var postObj = {};
		postObj.userId = $scope.userData.userId;
		postObj.currencyType = type;
		postObj.bitcoinWalletId = id;
		if (type == 'ETH') {
			postObj.ethWalletId = id;
		}else if(type == 'BITCOIN'){
			postObj.bitcoinWalletId = id;
		}

		// $http.post('http://api.worldtourism.io:8080/tourcoins/saveWalletId',postObj).then(success,error);
		$http.post('https://api.worldtourism.io/tourcoins/saveWalletId',postObj).then(success,error);

		function success(res){
			console.log(res);
			if (res.data.success) {
				Materialize.toast('Wallet Id Added Successfully', 3000);
			}
			$scope.fetchData();
		}

		function error(err){
			console.log(err);
		}
	}
});