'use strict';

angular.module('core').controller('ToolbarController', ['$scope', '$state', '$mdSidenav', 'Authentication',
  function ($scope, $state, $mdSidenav, Authentication) {
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;

    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };
  }
]);
