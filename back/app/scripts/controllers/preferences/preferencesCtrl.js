'use strict';

angular.module('coloc').controller('preferencesCtrl', ['$scope', 'contextService', 'queryService', function($scope,
	contextService, queryService) {
	$scope.user = contextService.user;
	$scope.coloc = contextService.coloc;
	var ColoQuery = queryService.getModel('colocs');
	var UserQuery = queryService.getModel('users');

	$scope.savePreferences = function() {
		ColoQuery.save($scope.coloc);
		UserQuery.save($scope.user);
	};

}]);
