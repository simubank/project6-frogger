angular.module('starter.controllers', [])

<<<<<<< HEAD
.controller('DashCtrl', function($scope, BotsService) {
  $scope.result = undefined
  
  BotsService.getSelf().then(function successCallback(rs) {
    $scope.result = rs.data.result.balance;
  });
})
=======
.controller('PostingsCtrl', function($scope) {})
>>>>>>> a05c877fc17f63f5bfaa06634b0acbf7538fc17f

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
.controller('MyShortlistCtrl', function($scope) {})

.controller('MyProfileCtrl', function($scope) {})

.controller('AppsCtrl', function($scope) {})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
