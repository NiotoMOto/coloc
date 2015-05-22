'use strict';

angular.module('coloc').controller('homeCtrl', ['$scope', 'queryService', 'contextService', function($scope,
	queryService, contextService) {
	var Spend = queryService.getModel('spends');

	function getSolde(totals) {
		return totals.solde.total - (totals.total.total / (totals.userCount ? totals.userCount : 1));
	}
	$scope.currentUser = contextService.user;
	$scope.colocusers = contextService.coloc;
	$scope.$watch('currentColoc', function(newColoc) {
		if (newColoc) {
			$scope.colocUsers = newColoc.users;
			$scope.init();
		}
	});
	$scope.soldes = {};

	function getSoldes() {
		_.each($scope.colocUsers, function(user) {
			queryService.query().post('/computed/spends/total', {
				user: user,
				coloc: $scope.currentColoc
			}).success(function(totals) {
				$scope.soldes[user.id] = {};
				$scope.soldes[user.id].totals = totals;
				$scope.soldes[user.id].solde = getSolde(totals);
			});
		});
	}

	function getTotal() {
		queryService.query().post('/computed/spends/total', {
			user: contextService.user,
			coloc: contextService.coloc
		}).success(function(totals) {
			$scope.totals = totals;
			$scope.solde = getSolde(totals);
		});
	}

	function getSpends() {
		Spend.findAll().then(function(data) {
			$scope.spends = data.elements;
		});
	}

	$scope.saveSpend = function() {
		var requete = {};
		requete.spend = $scope.newSpend;
		requete.toUser = $scope.toUser;
		console.log($scope.toUser, $scope.toUser.id);
		requete.user = contextService.user;
		requete.coloc = contextService.coloc;
		Spend.save(requete).then(function() {
			$scope.newSpend = {};
			getSpends();
			getTotal();
			getSoldes();
		});
	};

	$scope.deleteSpend = function(spend) {
		Spend.remove(spend.id).then(function() {
			getTotal();
			getSoldes();
			getSpends();
		});
	};

	$scope.init = function() {
		getSpends();
		getTotal();
		getSoldes();
	};
}]);
