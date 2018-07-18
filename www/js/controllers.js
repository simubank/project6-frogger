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
  .controller('compaisionCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    }])

  .controller('myProfileCtrl', ['$scope', '$stateParams', 'BotsService', 'User',
    function ($scope, $stateParams, BotsService, User) {
      var vm = this;
      $scope.currentUserId = 0;
      $scope.user = {
        "name": "Jon Snow",
        "id": 0,
        "location": "Toronto, Ontario",
        "description": "Hi! I am currently looking for a place to stay for the upcoming winter!Hi! I am currently looking for a place to stay for the upcoming winter!Hi! I am currently looking for a place to stay for the upcoming winter!",
        "status": "Seeking a 1 year lease in Guelph. Subletting a room in Kitchener for Fall term",
        "listings": [],
        "reviews": [
          {
            "review": "Jon was a very great tenant, who is clean, quiet and is a real leader! 10/10 would lease to again.",
            "name": "Ned Stark",
            "id": 3000,
            "timestamp": "July 15, 2018",
            "rating": 5.0
          },
          {
            "review": "An amazing tenant with a great track record...",
            "name": "Daeneyrs Targaryon",
            "id": 1000,
            "timestamp": "June 17, 2017",
            "rating": 4.0
          }
        ]
      };

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

  .controller('writeReviewCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {
      $scope.starRatingClass = ["far fa-star", "far fa-star", "far fa-star", "far fa-star", "far fa-star"];

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

    }])


