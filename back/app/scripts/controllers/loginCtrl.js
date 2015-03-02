'use strict';

angular.module('coloc').controller('loginCtrl', ['$scope', '$http', 'CONFIG', 'contextService', '$location', function(
  $scope, $http,
  config, contextService, $location) {
  $scope.login = function() {
    $http.post(config.server.url + '/login', $scope.user).success(function() {
      $location.url('/home');
    });
  };
}]);
