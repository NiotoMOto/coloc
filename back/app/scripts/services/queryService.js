'use strict';

angular.module('coloc').factory('queryService', ['$resource', 'CONFIG', '$http',

  function apiFoot($resource, config, $http) {
    var getModel = function(strModel) {
      var model = $resource(config.server.url + '/' + strModel + '/:id', null, {
        'findAll': {
          method: 'get'
        },
        'save': {
          method: 'patch'
        },
        'remove': {
          method: 'delete'
        }
      });

      return {
        findAll: function() {
          return model.findAll().$promise;
        },
        save: function(data) {
          return model.save(data).$promise;
        },
        remove: function(id) {
          return model.remove({
            id: id
          }).$promise;
        }
      };
    };

    var query = function() {
      return {
        get: function(url) {
          return $http.get(config.server.url + url);
        },
        post: function(url, data) {
          return $http.post(config.server.url + url, data);
        }
      };
    };
    return {
      getModel: getModel,
      query: query
    };
  }
]);
