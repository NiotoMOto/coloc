'use strict';

angular.module('coloc').factory('contextService', ['$cookieStore','$rootScope', function($cookieStore, $rootScope) {
  var user = {};
  var coloc = {};

  var setUser = function(user) {
    this.user = user;
    $cookieStore.put('user', user);
		$rootScope.currentUser = user;
  };

  var setColoc = function(coloc) {
    this.coloc = coloc;
    $cookieStore.put('coloc', coloc);
		$rootScope.currentColoc = coloc;
  };
  return {
    user: user,
    coloc: coloc,
    setColoc: setColoc,
    setUser: setUser
  };
}]);
