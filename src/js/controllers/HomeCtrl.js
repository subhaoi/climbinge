angular.module('climbingeApp')
.controller('HomeCtrl', ['$scope','$http',function($scope, $http) {
        $scope.home = "This is the homepage";
        
    
		var url = 'http://139.59.22.177:8080/AVATHI_API/rest/ajaxRoute/getRouteListByMainCity';
		var data = {"mainCityPk":"1"};
		var config = 'application/json; charset=utf-8'

		$http.post(url, data, config)
		.then(function (response) {

		$scope.statusval = "Post Data Submitted Successfully!";

		}
		, function (response) {
			$scope.statusval = "failed!";

		}
		);

	}
]);

