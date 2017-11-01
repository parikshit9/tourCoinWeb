'use strict';

var worldTourApp = angular.module('worldTourApp', ['ui.router', 'ngRoute', 'chart.js']);

worldTourApp.config(function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
    // $locationProvider.html5Mode({
    //     enabled: true
    // });

    //token interceptor
    //$httpProvider.interceptors.push('authInterceptor');

    //Enable cross domain calls
    // $httpProvider.defaults.useXDomain = true;

    //Remove the header used to identify ajax call  that would prevent CORS from working
    // delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state("home", {
            url: "/",
            templateUrl: "/views/home.html",
            controller: "wtoController"
        })

    $locationProvider.html5Mode(true);
});

worldTourApp.config(['ChartJsProvider', function (ChartJsProvider) {
// Configure all charts
    ChartJsProvider.setOptions({
        chartColors: ['#05e7e6', '#FFFFFF'],
        responsive: false
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
        showLines: false
    });
}])