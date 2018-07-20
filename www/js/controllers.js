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
   
  .controller('myProfileCtrl', ['$scope', '$stateParams', 'BotsService', 'User',
  function ($scope, $stateParams, BotsService, User) {
    $scope.currentUserId = 0;

    BotsService.getUser(0).then(function(data) {
        $scope.user = new User(data.result[0]);
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
   
.controller('shortlistCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
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
        $scope.user = new User(data.result[0]);
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
        $scope.user = new User(data.result[0]);
    });
    //this is used to get the data of the user who's profile you are viewing (not your own profile...)
    //BotsService.getViewingUser(0).then(function(data) {
        //$scope.user = new User(data.result[0]);
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
            "name": $scope.user.data.givenName + ' ' +$scope.user.data.surname,
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
      $scope.user = new User(data.result[0]); //pass in as param here
      $scope.averageStars = $scope.createStars($scope.user.averageStars());
  });
  
  $scope.createStars = function(rating){
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

}])
   
 