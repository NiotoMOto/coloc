'use strict';

angular.module('coloc').controller('homeCtrl', ['$scope', 'queryService', '$cookieStore', function($scope, queryService,
	$cookieStore) {
	var Coloc = queryService.getModel('colocs');
	var User = queryService.getModel('users');
	var currentUser = $cookieStore.get('user');
  console.log(currentUser);
	Coloc.findAll().then(function(data) {
		$scope.colocs = data;
	});
	User.findAll().then(function(data) {
    $cookieStore.put('user',data[0]);
		$scope.uers = data;
	});
}]);
