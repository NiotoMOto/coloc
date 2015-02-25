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
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'homeCtrl'
      })
      .when('/preferences/user', {
        templateUrl: 'views/preferences/preferences.html',
        controller: 'preferencesCtrl'
      })
      .otherwise({
        redirectTo: '/home'
      });
  });
