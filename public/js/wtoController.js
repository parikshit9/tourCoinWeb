worldTourApp.controller('wtoController', function($scope, $rootScope, $state, $timeout, $sce, $http, $window, $stateParams) {
	$scope.state = $state;
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

	$scope.mainLabels = ["Crowdsale Investors", "Bounty & rewards", "Founders", "Research and Promotion"];
	$scope.mainData = [70, 5, 10, 15];
	$scope.mainColors = ["#204f84","#53a8e2","#50e3c2","#dbecf8"];
	$scope.mainOptions = {
		tooltips: {
            enabled: true,
            callbacks: {
                label: function(tooltipItem, data) {
                	// console.log(tooltipItem,data);
                    return data.labels[tooltipItem.index] + '   ' + data.datasets[0].data[tooltipItem.index] + '%';
                }
            }
        },
        segmentShowStroke: false
	}
	$scope.mainOverride = {
	    backgroundColor: ["#204f84","#53a8e2","#50e3c2","#dbecf8"],
	    hoverBackgroundColor: ["#204f84","#53a8e2","#50e3c2","#dbecf8"],
	    hoverBorderColor: ["#204f84","#53a8e2","#50e3c2","#dbecf8"]
	};

    $scope.validateEmail = function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
            $scope.errmsg = '';
        }else{
            $scope.errmsg = 'Invalid Email';
        }
    }

	$scope.structure = {};
	$scope.structure.data1 = [25,75];
	$scope.structure.data2 = [15,85];
	$scope.structure.data3 = [15,85];
	$scope.structure.data4 = [10,90];
	$scope.structure.data5 = [5,95];
	$scope.structure.data6 = [40,60];
	$scope.structure.data7 = [20,80];
	$scope.structure.data8 = [10,90];
	$scope.structure.data9 = [20,80];
	$scope.structure.data10 = [10,90];

	$scope.structure.options = {
		tooltips: {
			enabled : false
		},
		segmentShowStroke: false,
		cutoutPercentage: 75,
		elements: {
	        arc: {
	            borderWidth: 0
	        }
	    }
	}

	$scope.structure.colors = ['#05e7e6','#e2e2e2'];

	$scope.structure.override = {
		backgroundColor: ['#05e7e6','#e2e2e2'],
	    hoverBackgroundColor: ['#05e7e6','#e2e2e2'],
	    hoverBorderColor: ['#05e7e6','#e2e2e2']
	}

	$scope.subscribeMail = function(id){
		var postObj = {
			"subscriptionEmailId" : id
		}

		// $http.post('http://api.worldtourism.io:8080/tourcoins/subscribeTourCoins',postObj).then(success,error);
		$http.post('https://api.worldtourism.io/tourcoins/subscribeTourCoins',postObj).then(success,error);

		function success(res){
			console.log(res);
			if (res.data.success) {
				Materialize.toast('Subscribed Succesfully!', 3000);
				$scope.mailId = null;
			}else if(res.data.error){
				Materialize.toast('Mail Id Already Subscribed!', 3000);
			}
		}

		function error(err){
			console.log(err);
		}
	}

	var end = new Date('12/01/2017 12:00 AM');

    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;

    function showRemaining() {
        var now = new Date();
        var distance = end - now;
        if (distance < 0) {

            clearInterval(timer);
            document.getElementById('countdown').innerHTML = 'EXPIRED!';

            return;
        }
        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);

        document.getElementById('countdown-dy').innerHTML = ('0'+days).slice(-2);
        document.getElementById('countdown-hr').innerHTML = ('0'+hours).slice(-2);
        document.getElementById('countdown-mn').innerHTML = ('0'+minutes).slice(-2);
        document.getElementById('countdown-sc').innerHTML = ('0'+seconds).slice(-2);
    }
    if ($state.current.name == 'home') {
    	timer = setInterval(showRemaining, 1000);
    }

    $rootScope.forgotMail;

    $scope.sendResetLink = function(){
    	var postObj = {};
    	postObj.userEmail = $rootScope.forgotMail;

    	// $http.post('http://api.worldtourism.io:8080/tourcoins/forgotPassword',postObj).then(success,error);
    	$http.post('https://api.worldtourism.io/tourcoins/forgotPassword',postObj).then(success,error);

    	function success(res){
    		console.log(res);
    		if (res.data.success) {
    			Materialize.toast(res.data.success, 3000);
    			$state.go('resetInstructions');
    		}else if(res.data.error){
    			Materialize.toast(res.data.error, 3000);
    		}
    	}

    	function error(err){
    		alert(err);
    	}
    }

    if ($state.current.name == 'resetPassword') {
    	console.log($stateParams.token);
    }

    $scope.reset = {};

    $scope.resetPassword = function(){
    	var postObj = {};
    	postObj.forgotPwdToken = $stateParams.token;
    	postObj.newPassword = $scope.reset.password;

    	console.log(postObj);

        var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@$!%*?&])[A-Za-z\d#$@$!%*?&]{8,}/;
        if (re.test($scope.registerObj.userPassword)) {
            $scope.pwdErrMsg = '';
            // $http.post('http://api.worldtourism.io:8080/tourcoins/resetPassword',postObj).then(success,error);
            $http.post('https://api.worldtourism.io/tourcoins/resetPassword',postObj).then(success,error);

            function success(res){
                console.log(res);
                if (res.data.success) {
                    Materialize.toast(res.data.success, 3000);
                    $state.go('passwordChanged');
                }else if(res.data.error){
                    Materialize.toast(res.data.error, 3000);
                }
            }

            function error(err){
                alert(err);
            }

        }else{
            $scope.pwdErrMsg = 'Password should be atleast 8 characters, Must contain at least one capital & small letter, one number and a special character';
        }
    }

    $scope.comparePass = function(){
        if ($scope.registerObj.pass !== $scope.registerObj.userPassword) {
            $scope.matchError = "Passwords don't match";
        }else{
            $scope.matchError = '';
        }
    }

    $scope.contact = {};

    $scope.contactUs = function(){
        var postObj = angular.copy($scope.contact);

        // $http.post('http://api.worldtourism.io:8080/tourcoins/contactUs',postObj).then(success,error);
        $http.post('https://api.worldtourism.io/tourcoins/contactUs',postObj).then(success,error);

        function success(res){
            console.log(res);
            if (res.data.success) {
                Materialize.toast('Your Message has been successfully sent!', 3000);
                $scope.contact = {};
            }else if(res.data.error){
                Materialize.toast(res.data.error, 3000);
            }
        }

        function error(err){
            console.log(err);
        }
    }
});