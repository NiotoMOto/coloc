'use strict';

angular.module('coloc').factory('queryService', ['$resource', 'CONFIG', function apiFoot($resource, config) {
  var getModel = function(strModel) {
    var model = $resource(config.server.url + '/' + strModel + '/:id', null, {
      'findAll': {
        method: 'get',
				isArray : true
      }
    });
		return  {
			findAll : function(){
				return model.findAll().$promise;
			}
		};
  };
  return {
    getModel: getModel
  };
}]);
