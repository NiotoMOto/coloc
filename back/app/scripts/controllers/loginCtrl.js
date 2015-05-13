'use strict';

angular.module('coloc').controller('loginCtrl', ['$scope', '$http', 'CONFIG', 'contextService', '$location', '$rootScope', function (
	$scope, $http,
	config, contextService, $location, $rootScope) {
	$rootScope.login = true;
	$scope.frontUrl = config.server.url;
	$scope.login = function () {
		$http.post(config.server.url + '/login', $scope.user).success(function () {
			$location.url('/home');
		});
	};
}]);
