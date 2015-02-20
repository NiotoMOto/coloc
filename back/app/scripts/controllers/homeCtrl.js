'use strict';

angular.module('coloc').controller('homeCtrl','queryServuce', function(queryService){
  var Coloc = queryService.getModel('coloc');
});
