'use strict';

angular.module('coloc').controller('indexCtrl', ['$scope', 'queryService', '$cookieStore', 'contextService',
  '$route',
  function(
    $scope,
    queryService,
    $cookieStore,
    contextService,
    $route){
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
      contextService.logout();
    };

    $scope.changeUser = function(user) {
      contextService.setUser(user);
      $route.reload();
    };
  }
]);
