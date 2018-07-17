angular.module('app.controllers', [])
  
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
   
.controller('myProfileCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {
    $scope.user = {
        "name": "Jon Snow", 
        "id": 2000,
        "location": "Toronto, Ontario",
        "description": "Hi! I am currently looking for a place to stay for the upcoming winter!",
        "status": ["Seeking a 1 year lease in Guelph", "Subletting a room in Kitchener for Fall term"],
        "listings": [],
        "reviews": [
            {
                "review" : "Jon was a very great tenant, who is clean, quiet and is a real leader! 10/10 would lease to again.",
                "name": "Ned Stark",
                "id": 3000,
                "timestamp": "July 15, 2018"
            },
            {
                "review" : "An amazing tenant with a great track record...",
                "name": "Daeneyrs Targaryon",
                "id": 1000,
                "timestamp": "June 17, 2017"
            }
        ]   
    }
    
    console.log ($scope.user.reviews[0].name);
    //YOU NEED TO GET USER ID FROM BOTS API!! CHANGE THIS!
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
   
 