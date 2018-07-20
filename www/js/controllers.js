angular.module('app.controllers', ["tdnb.services"])

  .controller('postingsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

  .controller('applicationsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

  .controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])
  .controller('comparisonCtrl', ['$scope', '$stateParams', 'BotsService', 'User', 'HouseListingService', '$ionicModal', '$timeout',
    function ($scope, $stateParams, BotsService, User, HouseListingService, $ionicModal, $timeout) {
      $scope.labels = ["Income", "Rent"];
      $scope.data = [3000, 1000];
      $scope.sufficentFunds = true;
      $scope.detailViewId = 0;
      $scope.title = {
        title: {
          display: true,
          text: 'Cost per month'
        },
      };

      $scope.listings = [
        HouseListingService.getListing(0),
        HouseListingService.getListing(3)
      ];

      $scope.chartSettings = {
        heading: "",
        title: {
          display: true,
          text: 'Cost per month'
        },
      };

      $scope.averageValue = HouseListingService.getMedianRentalValue();
      $scope.averageWalkScore = HouseListingService.getMedianWalkScoreValue();
      $scope.averageSafetyScore = HouseListingService.getMedianSafetyValue();

      $scope.comparisonData = [];

      $scope.valueData = [];
      for (var i = 0; i < $scope.listings.length; i++) {
        $scope.valueData[i] = $scope.listings[i].posting_details.housing_Details.price;
      }

      $scope.walkScoreData = [];
      for (var i = 0; i < $scope.listings.length; i++) {
        $scope.walkScoreData[i] = $scope.listings[i].posting_details.walkscore.walkscore;
      }

      $scope.safetyScoreData = [];
      for (var i = 0; i < $scope.listings.length; i++) {
        $scope.safetyScoreData[i] = $scope.listings[i].posting_details.safetyScore;
      }

      $scope.calculateScore = function (average, value, lowerIsBetter) {
        var result = value / average;
        var score = 0;
        if (result < 1) {
          score = 0.5 / Math.max(result, 0.5);
          if (lowerIsBetter) {
            return (score) * 5;
          } else {
            return (1 - score) * 5;
          }
        } else {
          score = 1.5 - Math.min(result, 1.5);
          if (lowerIsBetter) {
            return (score) * 5;
          } else {
            return (1 - score) * 5;
          }
        }
      };

      $scope.getWeightedScore = function (index) {
        var weightedValue = $scope.calculateScore($scope.averageValue, $scope.valueData[index], true) * .5;
        var weightWalkScore = $scope.calculateScore($scope.averageWalkScore, $scope.walkScoreData[index], false) * .3;
        var weightedSafetyScore = $scope.calculateScore($scope.averageSafetyScore, $scope.safetyScoreData[index], false) * .2;

        return weightedValue + weightWalkScore + weightedSafetyScore;
      };

      BotsService.getUser(9).then(function (data) {
        $scope.user = new User(data);
        $scope.user.getIncome().then(function (res) {
          $scope.userIncome = res;
        });
      });

      $ionicModal.fromTemplateUrl('/templates/comparisonCharts/value-view.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });


      $scope.openValueModal = function (index) {
        $scope.detailViewId = index;
        // $scope.data = [$scope.userIncome, $scope.valueData[index]];

        var portionOfUserIncome = $scope.userIncome - $scope.valueData[index];
        if (portionOfUserIncome < 0) {
          portionOfUserIncome = 0;
          $scope.sufficentFunds = false;
        } else {
          $scope.sufficentFunds = true;
        }
        $scope.data = [portionOfUserIncome, $scope.valueData[index]];
        $scope.modal.show();
      };

      $scope.isHighestValue = function (listObj, average, index) {
        var value1 = $scope.calculateScore(average, listObj[0]);
        var value2 = $scope.calculateScore(average, listObj[1]);

        if (value1 > value2) {
          return index == 1;
        } else {
          return index == 0;
        }
      }

      $scope.createStars = function (rating) {
        var starRating = [];
        for (var j = 0; j < 5; j++) {
          if (j <= (rating - 1)) {
            starRating[j] = "fas fa-star checked";
          }
          else if (j !== 0 && rating > j && rating < j + 1) {
            starRating[j] = "fas fa-star-half checked";
          }
          else {
            starRating[j] = "far fa-star";
          }
        }
        return starRating;
      }
      // $scope.closeValueModal = function() {
      //   $scope.modal.hide();
      // };
      // // Cleanup the modal when we're done with it!
      // $scope.$on('$destroy', function() {
      //   $scope.modal.remove();
      // });
      // // Execute action on hide modal
      // $scope.$on('modal.hidden', function() {
      //   // Execute action
      // });
      // // Execute action on remove modal
      // $scope.$on('modal.removed', function() {
      //   // Execute action
      // });
    }])

  .controller('myProfileCtrl', ['$scope', '$stateParams', 'BotsService', 'User',
    function ($scope, $stateParams, BotsService, User) {
      var vm = this;
      $scope.currentUserId = 0;

      BotsService.getUser(0).then(function (data) {
        $scope.user = new User(data);
        $scope.averageStars = $scope.createStars($scope.user.averageStars());
        $scope.user.getIncome().then(function (res) {
          console.log(res);
        });
      });

      $scope.createStars = function (rating) {
        var starRating = [];
        for (var j = 0; j < 5; j++) {
          if (j <= (rating - 1)) {
            starRating[j] = "fas fa-star checked";
          }
          else if (j !== 0 && rating > j && rating < j + 1) {
            starRating[j] = "fas fa-star-half checked";
          }
          else {
            starRating[j] = "far fa-star";
          }
        }
        return starRating;
      }

      function writeReview() {
        this.navCtrl.setRoot(writeReview);
      }
    }])

  .controller('pageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

  .controller('shortlistCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

  .controller('writeReviewCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {

    }])

  .controller('createPostingCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])
  .controller('viewPostingCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {
      function initMap() {
        var postingLocation = { lat: posting.latitude, lng: posting.longitude };
        var map = new google.maps.Map(
          document.getElementById('map'), { zoom: 4, center: myPosting });
        var marker = new google.maps.Marker({ position: postingLocation, map: map });

      }

    }])

  .controller('writeReviewCtrl', ['$rootScope', '$scope', '$stateParams', '$state', 'BotsService', 'User',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($rootScope, $scope, $stateParams, $state, BotsService, User) {
      $scope.starRatingClass = ["far fa-star", "far fa-star", "far fa-star", "far fa-star", "far fa-star"];

      BotsService.getUser(0).then(function (data) {
        $scope.user = new User(data);
      });

      $scope.starHighlight = function (starCount) {
        //note that starcount is rating-1 to deal with indexing issues..
        $scope.starRatingClass = ["far fa-star", "far fa-star", "far fa-star", "far fa-star", "far fa-star"];
        for (var i = 0; i < starCount + 1; i++) {
          if (i <= (starCount)) {
            $scope.starRatingClass[i] = "fas fa-star checked";
          }
          else {
            $scope.starRatingClass[i] = "far fa-star";
          }
        }
        return $scope.starRatingClass;
      }

      BotsService.getUser(0).then(function (data) {
        $scope.user = new User(data);
      });

      $scope.submitReview = function () {
        $scope.user.reviews.push($scope.reviewText)
      }

    }])
  .controller('viewProfileCtrl', ['$scope', '$stateParams', 'BotsService', 'User',
    function ($scope, $stateParams, BotsService, User) {
      $scope.currentUserId = 0;

      BotsService.getUser(0).then(function (data) {
        $scope.user = new User(data); //pass in as param here
        $scope.averageStars = $scope.createStars($scope.user.averageStars());
      });

      $scope.createStars = function (rating) {
        var starRating = [];
        for (var j = 0; j < 5; j++) {
          if (j <= (rating - 1)) {
            starRating[j] = "fas fa-star checked";
          }
          else if (j !== 0 && rating > j && rating < j + 1) {
            starRating[j] = "fas fa-star-half checked";
          }
          else {
            starRating[j] = "far fa-star";
          }
        }
        return starRating;
      }
    }])

