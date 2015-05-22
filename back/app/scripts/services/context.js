'use strict';

angular.module('coloc').factory('contextService', ['$cookieStore', '$rootScope', 'queryService', '$http', 'CONFIG',
	'$location',
	function(
		$cookieStore,
		$rootScope, queryService, $http, config, $location) {

		var contextService = {
			user: {},
			coloc: {}
		};

		contextService.setUser = function(user, callback) {
			contextService.user = user;
			$cookieStore.put('user', user);
			$rootScope.currentUser = user;
			queryService.getModel('users').get({
				id: user.id
			}).then(function(u) {
				if (u.colocs && u.colocs[0]) {
					contextService.setColoc(u.colocs[0], callback);
				} else {
					console.log('no coloc');
					callback('no coloc');
				}
			});
		};

		contextService.setColoc = function(coloc, callback) {
			queryService.getModel('colocs').get({
				id: coloc.id
			}).then(function(c) {
				$cookieStore.put('coloc', c);
				$rootScope.currentColoc = c;
				contextService.coloc = coloc;
				callback();
			});
		};

		contextService.logout = function() {
			$http.post(config.server.url + '/logout').success(function() {
				contextService.reset();
				$location.url(config.server.url);
			});
		};

		contextService.reset = function() {
			contextService.user = {};
			contextService.coloc = {};
      $rootScope.currentUser = {};
      $rootScope.currentColoc = {};
		};

		return contextService;
	}
]);
