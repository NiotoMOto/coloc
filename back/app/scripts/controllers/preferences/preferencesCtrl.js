'use strict';

angular.module('coloc').controller('preferencesCtrl', ['$scope', 'contextService', 'queryService', function($scope,
  contextService, queryService) {
  $scope.user = contextService.user;
  $scope.coloc = contextService.coloc;
  $scope.colocCreate = {};
  $scope.searchColoc = {};
  var ColoQuery = queryService.getModel('colocs');
  var UserQuery = queryService.getModel('users');
  var InvitationQuery = queryService.getModel('invitations');

  $scope.savePreferences = function() {
    ColoQuery.save($scope.coloc);
    UserQuery.save($scope.user);
  };

  $scope.getInvitations = function() {
    InvitationQuery.find({
      filter: {
        toId: $scope.user.id
      }
    }).then(function(invitations) {
      $scope.invitationsReceive = invitations.elements;
    });
    InvitationQuery.find({
      filter: {
        asId: $scope.user.id
      }
    }).then(function(invitations) {
      $scope.invitationsSent = invitations.elements;
    });
  };

  $scope.acceptColoc = function(invitation) {
		console.log(invitation);
    invitation.status = 'accepted';
    InvitationQuery.update(invitation).then(function() {
			console.log('OK');
    });
  };

  $scope.searchUser = function() {
    InvitationQuery.save({
      user: $scope.user,
      search: $scope.searchColoc.search,
      status: 'sended'
    }).then(function() {
      // InvitationQuery.post().then(function(invitations) {
      //   $scope.invitations = invitations;
      // });
    });
  };

  $scope.createColoc = function() {
    ColoQuery.save({
      coloc: $scope.colocCreate,
      user: $scope.user
    }).then(function() {
      contextService.setUser($scope.user, function() {
        $scope.user = contextService.user;
        $scope.coloc = contextService.coloc;
      });
    });
  };

  $scope.getInvitations();

}]);
