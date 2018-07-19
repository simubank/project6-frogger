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
    var vm=this;
    $scope.currentUserId = 0;

    BotsService.getUser(0).then(function(data) {
        $scope.user = new User(data.result[0]);
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

    function writeReview(){
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


.controller('writeReviewCtrl', ['$rootScope', '$scope', '$stateParams', '$state', 'BotsService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($rootScope, $scope, $stateParams, $state, BotsService) {
    $scope.starRatingClass =["far fa-star","far fa-star","far fa-star","far fa-star","far fa-star"];

    $scope.starHighlight = function(starCount){
        //note that starcount is rating-1 to deal with indexing issues..
        $scope.starRatingClass = ["far fa-star","far fa-star","far fa-star","far fa-star","far fa-star"];
        for(var i=0;i<starCount+1;i++){
            if(i<=(starCount)){
                $scope.starRatingClass[i]="fas fa-star checked";
            }
            else{
                $scope.starRatingClass[i]="far fa-star";
            }
        }
        return $scope.starRatingClass;
    }

    $scope.previousState;
    $scope.currentState;

    $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
        $scope.previousState = from.name;
        $scope.currentState = to.name;
    });

    $scope.cancel= function(){
        $state.go($scope.previousState);
    }

    BotsService.getUser(0).then(function(data) {
        $scope.user = new User(data.result[0]);
    });

    $scope.submitReview= function(){
        $scope.user.reviews.push($scope.review-text)
    }

}])
   
 