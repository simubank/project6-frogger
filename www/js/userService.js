angular.module('tdnb.services')
    .factory('UserService', function ($resource, $q) {
        var user = 0;

        return {
            setUser: function (number) {
                user = number;
            },
            getCurrentUser: function () {
                return user;
            }
        }
    });