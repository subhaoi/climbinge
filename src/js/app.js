angular.module('climbingeApp', [
    'ngRoute'
])
.config([
    '$routeProvider',
    function($routeProvider) {
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
