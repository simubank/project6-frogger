angular.module('app.controllers')

.controller('menuCtrl', ['$scope', '$stateParams', 'UserService', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, UserService, $rootScope) {

    $scope.userAccountID = 0;


    $scope.changeUser = function() {
        UserService.setUser($scope.userAccountID);
        $rootScope.changeUser();
    }

}]);