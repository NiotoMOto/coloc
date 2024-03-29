'use strict';

/**
 * @ngdoc overview
 * @name backApp
 * @description
 * # backApp
 *
 * Main module of the application.
 */

angular
	.module('coloc', [
	'ngAnimate',
	'ngCookies',
	'ngResource',
	'ngRoute',
	'ngSanitize',
	'ngTouch',
	'ui.bootstrap',
	'ui.select',
	'coloc.constants'
]).config(function ($routeProvider, $httpProvider, CONFIG) {
	$httpProvider.defaults.withCredentials = true;
	var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope, contextService) {
		// Initialize a new promise
		var deferred = $q.defer();

		// Make an AJAX call to check if the user is logged in
		$http.get('http://localhost:3001' + '/loggedin').success(function (user) {
			// Authenticated
			if (user !== '0') {
				contextService.setUser(user, function (err) {
					if (err === 'no coloc') {
						deferred.resolve();
						$location.url('/preferences/user');
					} else {
						deferred.resolve();
					}
				});
			}
			else {
				$rootScope.message = 'You need to log in.';
				deferred.reject();
				window.location.href = CONFIG.server.url+'#connexion';
			}
		});

		return deferred.promise;
	};

	$httpProvider.interceptors.push(function ($q, $location) {
		return {
			response: function (response) { // do something on success
				return response;
			},
			responseError: function (response) {
				if (response.status === 401) {
					window.location.href = CONFIG.server.url+'#connexion';
				}
				return $q.reject(response);
			}
		};
	});

	$routeProvider
		.when('/login', {
		templateUrl: 'views/login.html',
		controller: 'loginCtrl'
	})
		.when('/home', {
		templateUrl: 'views/home.html',
		controller: 'homeCtrl',
		resolve: {
			loggedin: checkLoggedin
		}
	})
		.when('/preferences/user', {
		templateUrl: 'views/preferences/preferences.html',
		controller: 'preferencesCtrl',
		resolve: {
			loggedin: checkLoggedin
		}
	})
		.otherwise({
		redirectTo: '/home'
	});
});
