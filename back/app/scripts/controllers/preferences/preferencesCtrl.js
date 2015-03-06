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
		console.log('save preferences');
    ColoQuery.save($scope.coloc);
    UserQuery.save($scope.user);
  };

  $scope.getInvitations = function() {
    InvitationQuery.find({
      filter: {
        toId: $scope.user.id
      }
    }).then(function(invitations) {
      $scope.invitationsReceive = _.filter(invitations.elements, function(i) {
        return i.status === 'sended';
      });
      $scope.invitationsAccepted = _.filter(invitations.elements, function(i) {
        return i.status === 'accepted';
      });
    });
    InvitationQuery.find({
      filter: {
        asId: $scope.user.id,
        status: 'sended'
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
      $scope.getInvitations();
    });
  };

  $scope.removeInvitation = function(invitation) {
    InvitationQuery.remove(invitation.id).then(function() {
      $scope.getInvitations();
    });
  };

  $scope.searchUser = function() {
    InvitationQuery.save({
      user: $scope.user,
      search: $scope.searchColoc.search,
      status: 'sended'
    }).then(function() {
			$scope.getInvitations();
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
