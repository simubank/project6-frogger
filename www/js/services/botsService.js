// Need to move this out eventually
var AppSettings = {
    authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDQlAiLCJ0ZWFtX2lkIjoiMjgxMzc3NSIsImV4cCI6OTIyMzM3MjAzNjg1NDc3NSwiYXBwX2lkIjoiZWY3OTAwYzctZTQwNC00NDE4LWI1MTctYmVlNjFhZmZlMmY3In0.PnkBgnHrDoyPLOeVd2LebEu7_e1aW3EnZwXD48Zf1Zk',
    botsApiUrl: 'https://dev.botsfinancial.com/'
};

angular.module('tdnb.services', [])
    .run(function($http) {
        $http.defaults.headers.common.Authorization = AppSettings.authorization;
    })

    .factory('BotsService', function ($http) {


        return {
            getSelf: function() {
                return $http({
                    method: 'GET',
                    url: AppSettings.botsApiUrl + 'api/accounts/self',
                  });
            },
            all: function () {
                return AppSettings;
            }
        };
    });