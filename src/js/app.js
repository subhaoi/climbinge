var app = angular.module('climbingeApp', [
    'ngRoute','angularjs-dropdown-multiselect',
]);

app.config([
    '$routeProvider','$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
            .when('/routeprofile',{
            	templateUrl: 'views/routeprofile.html',
            	controller: 'routeprofileCtrl'
            });
    }

]);
