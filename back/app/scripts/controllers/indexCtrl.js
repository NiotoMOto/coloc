'use strict';

angular.module('coloc').controller('indexCtrl', ['$scope', 'queryService', '$cookieStore', 'contextService',
  '$route', 'CONFIG', '$http', '$location',
  function(
    $scope,
    queryService,
    $cookieStore,
    contextService,
    $route, config, $http, $location) {
    $scope.context = contextService;

    // Coloc.findAll().then(function(data) {
    //   $scope.colocs = data.elements;
    //   contextService.setColoc(data.elements[2]);
    //
    // });
    // User.findAll().then(function(data) {
    //   contextService.setUser(data.elements[2]);
    // });

    $scope.logout = function() {
      $http.post(config.server.url + '/logout');
      contextService.reset();
      $location.url('/login');
    };

    $scope.changeUser = function(user) {
      contextService.setUser(user);
      $route.reload();
    };
  }
]);
