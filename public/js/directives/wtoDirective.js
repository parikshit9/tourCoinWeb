var worldTourApp = angular.module('worldTourApp');

worldTourApp.directive('wtoFooter', function() {
    return {
        restrict: 'E',
        templateUrl: '/views/directives/wtoFooter.html'
    };
});