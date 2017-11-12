worldTourApp.controller('wtoController', function($scope, $rootScope, $state, $timeout, $sce, $http, $window) {
	$scope.state = $state;
	$(document).ready(function(){
		$('.parallax').parallax();
		$('.collapsible').collapsible();
		$('.scrollspy').scrollSpy();
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
});