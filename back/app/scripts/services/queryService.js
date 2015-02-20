'use strict';

angular.module('coloc').factory('queryService', 'CONFIG', function apiFoot($resource, config) {
	var getModel = function(model) {
		return $resource(config.server.url + '/' + model);
	};
	return {
		getModel: getModel
	};
});
