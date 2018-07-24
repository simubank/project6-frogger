// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services', 'ngResource', 'chart.js'])

.config(function($ionicConfigProvider, $sceDelegateProvider){

  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

})

.run(function($ionicPlatform, $rootScope, $state, $stateParams) {
  //general back button functinality. WILL NOT WORK ON PAGE REFRESH!!!
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  $rootScope.changeUser = function() {
    $rootScope.$broadcast("UserChange");
  }

  $rootScope.changeComparisonID = function(item1, item2) {
    console.log(item1, item2);
    $rootScope.$broadcast('ComparisonIDChange', [item1, item2]);
  }

  $rootScope.$on("$stateChangeSuccess",  function(event, toState, toParams, fromState, fromParams) {
    $rootScope.previousState_name = fromState.name;
    $rootScope.previousState_params = fromParams;
  });
  $rootScope.back = function() {
    $state.go($rootScope.previousState_name,$rootScope.previousState_params);
  };

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
*/
.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",  
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])

/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
.directive('hrefInappbrowser', function() {
  return {
    restrict: 'A',
    replace: false,
    transclude: false,
    link: function(scope, element, attrs) {
      var href = attrs['hrefInappbrowser'];

      attrs.$observe('hrefInappbrowser', function(val){
        href = val;
      });
      
      element.bind('click', function (event) {

        window.open(href, '_system', 'location=yes');

        event.preventDefault();
        event.stopPropagation();

      });
    }
  };
});

angular.module('starter', [])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.directive('stickyHeader', function ($window) {
  var $win = angular.element($window); // wrap window object as jQuery object

  return {
      restrict: 'A',
      link: function (scope, element, attrs) {
          var topClass = attrs.stickyHeader, // get CSS class from directive's attribute value
              offsetTop = element.offset().top; // get element's top relative to the document

          $win.scroll(function (e) {
              if ($win.scrollTop() >= offsetTop) {
                  element.addClass(sticky);
              } else {
                  element.removeClass(sticky);
              }
          });
      }
  };
})

.directive('format', ['$filter', function ($filter) {
  return {
      require: '?ngModel',
      link: function (scope, elem, attrs, ctrl) {
          if (!ctrl) return;

          ctrl.$formatters.unshift(function (a) {
              return $filter(attrs.format)(ctrl.$modelValue)
          });

          elem.bind('blur', function(event) {
              var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
              elem.val($filter(attrs.format)(plainNumber));
          });
      }
  };
}]);