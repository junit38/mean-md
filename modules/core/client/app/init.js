'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
  function ($locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
  }
]);

angular.module(ApplicationConfiguration.applicationModuleName)
  .controller('ToolbarCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };
  }]);

angular.module(ApplicationConfiguration.applicationModuleName)
  .run(function ($rootScope, $mdSidenav, $state, $timeout) {
    $rootScope.navigateTo = function(to, event) {
      if (typeof to === 'object' && to.state && to.param) {
        $state.transitionTo(to.state, to.param)
      } else if (typeof to === 'string') {
        if ($mdSidenav('left').isOpen())
          $mdSidenav('left').toggle();
        if (to && to[0] === '/') {
          window.target = '_self';
          window.location = to;
        } else if (to && to !== '')
          $state.go(to);
      }
    };
  });

angular.module(ApplicationConfiguration.applicationModuleName).run(function ($rootScope, $state, Authentication) {
  // Check authentication before changing state
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    if (toState.data && toState.data.roles && toState.data.roles.length > 0) {
      var allowed = false;
      toState.data.roles.forEach(function (role) {
        if (Authentication.user.roles !== undefined && Authentication.user.roles.indexOf(role) !== -1) {
          allowed = true;
          return true;
        }
      });

      if (!allowed) {
        event.preventDefault();
        $state.go('authentication.signin', {}, {
          notify: false
        }).then(function () {
          $rootScope.$broadcast('$stateChangeSuccess', 'authentication.signin', {}, toState, toParams);
        });
      }
    }
  });

  // Record previous state
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    $state.previous = {
      state: fromState,
      params: fromParams,
      href: $state.href(fromState, fromParams)
    };
  });
});

//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_') {
    window.location.hash = '#!';
  }

  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
