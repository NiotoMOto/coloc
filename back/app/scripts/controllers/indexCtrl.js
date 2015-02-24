'use strict';

angular.module('coloc').controller('indexCtrl', ['$scope', 'queryService', '$cookieStore', 'contextService',
  '$route',
  function(
    $scope,
    queryService,
    $cookieStore,
    contextService,
    $route) {
    var Coloc = queryService.getModel('colocs');
    var User = queryService.getModel('users');
    // contextService.setUser($cookieStore.get('user'));
    // contextService.setColoc($cookieStore.get('coloc'));

    Coloc.findAll().then(function(data) {
      $scope.colocs = data.elements;
      contextService.setColoc(data.elements[2]);
      $scope.colocUsers = contextService.coloc.users;
    });
    User.findAll().then(function(data) {
      contextService.setUser(data.elements[2]);
    });

    $scope.changeUser = function(user) {
      contextService.setUser(user);
			$route.reload();
    };
  }
]);
