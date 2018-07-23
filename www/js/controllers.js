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
  .controller('comparisonCtrl', ['$scope', '$stateParams', 'BotsService', 'User', 'HouseListingService', '$ionicModal', '$timeout', '$filter',
    function ($scope, $stateParams, BotsService, User, HouseListingService, $ionicModal, $timeout, $filter) {
      $scope.incomeLabels = ["Income", "Rent"];
      $scope.labels = ["Income", "Rent"];
      $scope.userIncome = 3000;

      $scope.data = [3000, 1000];
      $scope.doughnutChartColors = ['#008000', '#ff6384'];

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
        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
      }
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
          score = Math.min(result, 1.9) / 1.9;
          if (lowerIsBetter) {
            return (1 - score) * 5;
          } else {
            return (score) * 5;
          }
        }
      };

      $scope.getWeightedScore = function (index) {
        var weightedValue = $scope.calculateScore($scope.averageValue, $scope.valueData[index], true) * .5;
        var weightWalkScore = $scope.calculateScore($scope.averageWalkScore, $scope.walkScoreData[index], false) * .3;
        var weightedSafetyScore = $scope.calculateScore($scope.averageSafetyScore, $scope.safetyScoreData[index], false) * .2;

        return weightedValue + weightWalkScore + weightedSafetyScore;
      };

      BotsService.getUser(0).then(function (data) {
        $scope.user = new User(data);
        $scope.user.getIncome().then(function (res) {
          $scope.userIncome = Number($filter('number')(res, 2));
          $scope.userIncome = 300;
        }).catch(function() {
          $scope.userIncome = 3000;
        });
      });

      $ionicModal.fromTemplateUrl('/templates/comparisonCharts/value-view.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });

      $ionicModal.fromTemplateUrl('/templates/comparisonCharts/safety-view.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.safetyModal = modal;
      });

      $ionicModal.fromTemplateUrl('/templates/comparisonCharts/walk-view.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.walkModal = modal;
      });
      
      $scope.openValueModal = function (index) {
        $scope.detailViewId = index;
        $scope.incomeData = [$scope.userIncome, $scope.valueData[index]];
        $scope.series = $scope.labels;
        $scope.chartSettings.title.text = "Rent to income";
        $scope.modal.show();
      };


      $scope.openSafetyModal = function (index) {
        $scope.detailViewId = index;
        $scope.safetyData = [$scope.averageSafetyScore, $scope.safetyScoreData[index]];
        $scope.safetyLabels = ['Average', 'This Property'];
        $scope.series = ['Crime Average', 'This Area'];
        $scope.chartSettings.title.text = "National safety score vs property";
        $scope.safetyModal.show();
      };

      $scope.openWalkModal = function (index) {
        $scope.detailViewId = index;
        $scope.walkData = [$scope.averageWalkScore, $scope.walkScoreData[index]];
        $scope.walkLabels = ['Average', 'This Property'];
        $scope.series = ['Average', 'This Property'];
        $scope.chartSettings.title.text = "National walk score vs property";
        $scope.walkModal.show();
      };

      $scope.isHighestValue = function (listObj, average, index, higherIsBetter) {
        if (!angular.isDefined(higherIsBetter)) {
          higherIsBetter = false;
        }
        var value1 = $scope.calculateScore(average, listObj[0], higherIsBetter);
        var value2 = $scope.calculateScore(average, listObj[1], higherIsBetter);

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
      $scope.closeValueModal = function() {
        $scope.modal.hide();
        $scope.safetyModal.hide();
      };
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
    });
    $scope.createStars = function(rating){
        //$scope.clearStars();
        var starRating=[];
        for(var j=0; j<5; j++){
            if(j<=(rating-1)){
                starRating[j]="fas fa-star checked";
            }
            else if(j!==0 && rating > j && rating < j+1){
                starRating[j]="fas fa-star-half checked";
            }
            else{
                starRating[j]="far fa-star";
            }
        }
        return starRating;
    }
    $scope.changeRating = function() {
        if ($scope.user)
            $scope.averageStars = $scope.createStars($scope.user.averageStars());
    }

    $scope.$watch('user.rating', function(newValue, oldValue) {
        $scope.changeRating();
    });

    $scope.clearStars = function(){
        var starRating=["far fa-star", "far fa-star", "far fa-star", "far fa-star", "far fa-star"];
    }

}])
   
.controller('pageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
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

.controller('writeReviewCtrl', ['$rootScope', '$scope', '$stateParams', '$state', 'BotsService', 'User', '$filter',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($rootScope, $scope, $stateParams, $state, BotsService, User, $filter) {
    $scope.starRatingClass =["far fa-star","far fa-star","far fa-star","far fa-star","far fa-star"];
    
    BotsService.getUser(0).then(function(data) {
        $scope.user = new User(data);
    });
    $scope.reviewRating = 0;
    $scope.starHighlight = function(starCount){
        $scope.reviewRating = 0;
        $scope.starRatingClass = ["far fa-star","far fa-star","far fa-star","far fa-star","far fa-star"];
        for(var i=1;i<=starCount+1;i++){
            if(i<=(starCount+1)){
                $scope.starRatingClass[i-1]="fas fa-star checked";
                $scope.reviewRating+=1;
            }
            else{
                $scope.starRatingClass[i-1]="far fa-star";
            }
        }
        return $scope.starRatingClass;
      }

    BotsService.getUser(0).then(function(data) {
        $scope.user = new User(data);
    });
    //this is used to get the data of the user who's profile you are viewing (not your own profile...)
    //BotsService.getViewingUser(0).then(function(data) {
        //$scope.user = new User(data);
   // });
   $scope.cancel = function(){
       $scope.reviewText="";
       $scope.reviewRating=0;
       $scope.starHighlight(-1);
       $rootScope.back();
   }
    $scope.submitReview= function(){
        var today = new Date();
        var formattedDate = $filter('date')(today, 'MMMM dd, yyyy');

        var reviewObject = {
            "review": $scope.reviewText,
            "name": $scope.user.getFullName(),
            "id": $scope.user.data.id,
            "timestamp": formattedDate,
            "rating": $scope.reviewRating*1.0
        }
        $scope.user.data.appData.reviews.push(reviewObject);
        $scope.reviewText="";
        $scope.reviewRating=0;
        $scope.starHighlight(-1);
        $rootScope.back();
    }

}])
.controller('viewProfileCtrl', ['$scope', '$stateParams', 'BotsService', 'User',
function ($scope, $stateParams, BotsService, User) {
  $scope.currentUserId = 0;

  BotsService.getUser(0).then(function(data) {
      $scope.user = new User(data); //pass in as param here
      $scope.averageStars = $scope.createStars($scope.user.averageStars());
  });
  
  $scope.createStars = function(rating){
      var starRating=[];
      for(var j=0; j<5; j++){
          if(j<=(rating-1)){
              starRating[j]="fas fa-star checked";
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

