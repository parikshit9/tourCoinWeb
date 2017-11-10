worldTourApp.controller('wtoController', function($scope, $rootScope, $state, $timeout, $sce, $http, $window) {

	$(document).ready(function(){
		$('.parallax').parallax();
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

		$http.post('http://ec2-18-216-197-240.us-east-2.compute.amazonaws.com:8080/tourcoins/subscribeTourCoins',postObj).then(success,error);

		function success(res){
			// console.log(res);
			if (res.data.subscriptionStatus) {
				Materialize.toast('Subscribed Succesfully!', 4000);
				$scope.mailId = null;
			}else if(res.data.Error){
				Materialize.toast('Mail Id Already Subscribed!', 4000);
			}
		}

		function error(err){
			console.log(err);
		}
	}
});