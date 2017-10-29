'use strict';

var worldTourApp = angular.module('worldTourApp', ['ui.router', 'ngRoute']);

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
    console.log(angular,"yay");
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state("home", {
            url: "/",
            templateUrl: "/views/home",
            controller: "wtoController"
        })

    // $locationProvider.html5Mode(false);
});