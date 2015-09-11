'use strict';

angular.module('core').controller('SidenavController', ['$scope', '$state', '$location', '$mdSidenav', 'Authentication', 'Menus',
  function ($scope, $state, $location, $mdSidenav, Authentication, Menus) {
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;
    $scope.dropdownOpen = [];

    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });

    $scope.toggleMenu = function(elem) {
      if ($scope.dropdownOpen[elem]) {
        $scope.dropdownOpen[elem] = !$scope.dropdownOpen[elem];
      } else {
        $scope.dropdownOpen[elem] = true;
      }
    };
  }
]);
