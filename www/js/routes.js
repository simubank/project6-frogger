angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

  .state('app.postings', {
    url: '/postings',
    views: {
      'tab2': {
        templateUrl: 'templates/postings.html',
        controller: 'postingsCtrl'
      }
    }
  })

  .state('app.applications', {
    url: '/applications',
    views: {
      'tab4': {
        templateUrl: 'templates/applications.html',
        controller: 'applicationsCtrl'
      }
    }
  })

  .state('app', {
    url: '/app',
    templateUrl: 'templates/app.html',
    abstract:true
  })

  .state('app.myProfile', {
    url: '/myProfile',
    views: {
      'tab3': {
        templateUrl: 'templates/myprofile.html',
        controller: 'myProfileCtrl'
      }
    }
  })

  .state('app.viewProfile', {
    url: '/viewProfile',
    templateUrl: 'templates/viewProfile.html',
    controller: 'viewProfileCtrl'
  })

  .state('page', {
    url: '/page8',
    templateUrl: 'templates/page.html',
    controller: 'pageCtrl'
  })


  .state('app.writeReview', {
    url: "/writeReview",
    views:{
      "writeReview":{
        templateUrl: 'templates/writereview.html',
      controller: 'writeReviewCtrl'
      }
    }
  })

  .state('app.shortlist', {
    url: '/shortlist',
    views: {
      'tab5': {
        templateUrl: 'templates/shortlist.html',
        controller: 'shortlistCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/app/postings')


});