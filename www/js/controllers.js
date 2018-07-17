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
   
  .controller('myProfileCtrl', ['$scope', '$stateParams', 'BotsService',
  function ($scope, $stateParams, BotsService) {
    var vm=this;
    $scope.currentUser = 2000;
    $scope.user = {
        "name": "Jon Snow", 
        "id": 2000,
        "location": "Toronto, Ontario",
        "description": "Hi! I am currently looking for a place to stay for the upcoming winter!Hi! I am currently looking for a place to stay for the upcoming winter!Hi! I am currently looking for a place to stay for the upcoming winter!",
        "status": "Seeking a 1 year lease in Guelph. Subletting a room in Kitchener for Fall term",
        "listings": [],
        "reviews": [
            {
                "review" : "Jon was a very great tenant, who is clean, quiet and is a real leader! 10/10 would lease to again.",
                "name": "Ned Stark",
                "id": 3000,
                "timestamp": "July 15, 2018",
                "rating": 5.0
            },
            {
                "review" : "An amazing tenant with a great track record...",
                "name": "Daeneyrs Targaryon",
                "id": 1000,
                "timestamp": "June 17, 2017",
                "rating": 4.0
            }
        ]
    };
    
    console.log ($scope.user.reviews[0].name);
    BotsService.getUser(0).then(function(data) {
      $scope.user = data.result[0]["test"];
    });
    //YOU NEED TO GET USER ID FROM BOTS API!! CHANGE THIS!
    vm.calculateRating = function(userId){
        var rating=0;
        for (var i=0; i< $scope.user['reviews'].length; i++) {
;            rating+=$scope.user['reviews'][i].rating;
        }
        rating=rating/($scope.user['reviews'].length);
        return rating;
    }
    $scope.rating =vm.calculateRating($scope.currentUser);
    
    $scope.stars = function(rating){
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

    $scope.averageStars = $scope.stars(vm.calculateRating($scope.currentUser));
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

.controller('writeReviewCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
 