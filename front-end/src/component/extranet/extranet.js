(function () {
  'use strict';

  var ExtranetController = function ($scope, $state) {
    var self = this;

    this.init = function () {
      $scope.msg = 'Extranet works!';
    };

    this.init();
  };

  angular
    .module('Databases')
    .service('extranet', [])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('extranet', {
          url: '/extranet',
          templateUrl: 'component/extranet/extranet.html',
          controllerAs: 'extranet',
          controller: 'ExtranetController'
        });
    }])
    .controller('ExtranetController', [
      '$scope',
      '$state',
      ExtranetController
    ]);
})();
