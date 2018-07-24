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

  .state('app.appointments', {
    url: '/appointments',
    views: {
      'tab7': {
        templateUrl: 'templates/appointments.html',
        controller: 'appointmentsCtrl'
      }
    }
  })

  .state('app.viewPosting', {
    url: '/viewPosting',
    templateUrl: 'templates/viewPosting.html',
    controller: 'viewPostingCtrl'
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
  //url: '/comparison/:id/:id2',
  .state('app.comparison', {
    url: '/comparison',
    views: {
      'tab5': {
        templateUrl: 'templates/comparison.html',
        controller: 'comparisonCtrl'
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