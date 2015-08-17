'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', '$location', '$mdSidenav', 'Authentication', 'Menus',
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

    $scope.navigateTo = function(to, event) {
      if ($mdSidenav('left').isOpen())
        $mdSidenav('left').toggle();
      if (to[0] === '/') {
        $location.path();
      }
      else 
        $state.go(to);
    };

    $scope.toggleMenu = function(elem) {
      if ($scope.dropdownOpen[elem]) {
        $scope.dropdownOpen[elem] = !$scope.dropdownOpen[elem];
      } else {
        $scope.dropdownOpen[elem] = true;
      }
      $('#list_' + elem).toggle('slow');
    };
  }
]);
