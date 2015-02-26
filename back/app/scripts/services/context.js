'use strict';

angular.module('coloc').factory('contextService', ['$cookieStore', '$rootScope', 'queryService', function($cookieStore,
  $rootScope, queryService) {

  var contextService = {
    user: {},
    coloc: {}
  };

  contextService.setUser = function(user) {
    this.user = user;
    $cookieStore.put('user', user);
    $rootScope.currentUser = user;
    queryService.getModel('users').get({
      id: user.id
    }).then(function(u) {
      if (u.colocs && u.colocs[0]) {
				contextService.setColoc(u.colocs[0]);
      }
    });
  };

  contextService.setColoc = function(coloc) {
    this.coloc = coloc;
    queryService.getModel('colocs').get({
      id: coloc.id
    }).then(function(c) {
      $cookieStore.put('coloc', c);
      $rootScope.currentColoc = c;
    });
  };

  return contextService;
}]);
