// Need to move this out eventually
var AppSettings = {
    authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDQlAiLCJ0ZWFtX2lkIjoiMjgxMzc3NSIsImV4cCI6OTIyMzM3MjAzNjg1NDc3NSwiYXBwX2lkIjoiZWY3OTAwYzctZTQwNC00NDE4LWI1MTctYmVlNjFhZmZlMmY3In0.PnkBgnHrDoyPLOeVd2LebEu7_e1aW3EnZwXD48Zf1Zk',
    botsApiUrl: 'https://dev.botsfinancial.com/'
};

var USERIDS = [
    {
        botsId: "ef7900c7-e404-4418-b517-bee61affe2f7_b5341fc4-f6d6-41a4-9562-d6ce55dce387",
        appData: {
            "description": "Hi! I am currently looking for a place to stay for the upcoming winter!",
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
        }
    },
    {
        botsId: "ef7900c7-e404-4418-b517-bee61affe2f7_eb2ff32c-aba3-4e4b-bd5b-03190fef76fb"
    },
    {
        botsId: "ef7900c7-e404-4418-b517-bee61affe2f7_b35ea8b6-3fa1-412d-ad4e-14134f58ceb7"
    },
    {
        botsId: "ef7900c7-e404-4418-b517-bee61affe2f7_f70a3064-a208-4282-aa56-8b7099056dcc"
    },
    {
        botsId: "ef7900c7-e404-4418-b517-bee61affe2f7_26b31f74-69bc-4c36-9ae8-5ae30dc8914b"
    }, // End of renter IDs

    {
        botsId: "ef7900c7-e404-4418-b517-bee61affe2f7_9df5822f-6802-4942-a734-b999b50cbb19",
        appData: {
            "description": "Hello, I am currently renting out some houses",
            "status": "Seeking 3 tenants for my latest posting...",
            "listings": [],
            "reviews": [
                {
                    "review": "Very good landlord, who maintains the place well!!",
                    "name": "Ned Stark",
                    "id": 3000,
                    "timestamp": "July 15, 2018",
                    "rating": 5.0
                },
                {
                    "review": "Never replied to my emails...always late for inspections too!!",
                    "name": "Daeneyrs Targaryon",
                    "id": 1000,
                    "timestamp": "June 17, 2017",
                    "rating": 2.0
                }
            ]
        }
    },
    {
        botsId: "ef7900c7-e404-4418-b517-bee61affe2f7_7e789538-8cf3-46b3-95a4-81e5d8a2a6a7"
    },
    {
        botsId: "ef7900c7-e404-4418-b517-bee61affe2f7_046815a5-8e94-40a6-ac96-3188710abb0c"
    },
    {
        botsId: "ef7900c7-e404-4418-b517-bee61affe2f7_de3e92ed-24d8-4e8f-949c-25079f270ef2"
    },
    {
        botsId: "ef7900c7-e404-4418-b517-bee61affe2f7_29d67bc2-e6a4-43bf-99ec-d5ff2aaa8ddb"
    }
];

var LANDOWNERS = [

];

angular.module('tdnb.services', [])
    .run(function ($http) {
        $http.defaults.headers.common.Authorization = AppSettings.authorization;
    })
    .factory('User', function () {

        /**
         * Constructor, with class name
         */
        function User(botsApiResponse) {
            // Public properties, assigned to the instance ('this')
            this.data = botsApiResponse;
        }


        User.prototype.updateRating = function (rating) {
            this.rating = rating;
        }

        /**
         * Public method, assigned to prototype
         */
        User.prototype.getFullName = function () {
            return this.data.givenName + ' ' + this.data.surname;
        };

        User.prototype.getLocation = function () {
            return this.data.addresses.principalResidence.municipality;
        };

        User.prototype.getRating = function(){
            var rating=0;
            for (var i=0; i< this.data.appData['reviews'].length; i++) {
                rating+=this.data.appData['reviews'][i].rating;
            }
            rating=rating/(this.data.appData['reviews'].length);
            User.prototype.updateRating(rating);
            return rating;
        };

        User.prototype.averageStars = function(){
            var rating=0;
            for (var i=0; i< this.data.appData['reviews'].length; i++) {
                rating+=this.data.appData['reviews'][i].rating;
            }
            rating=rating/(this.data.appData['reviews'].length);
            return rating;
        };

        /**
         * Return the constructor function
         */
        return User;
    })

    .factory('BotsService', function ($http, $resource, $q) {
        return {
            getUser: function (id) {
                var rs;
                var defer = $q.defer();
                rs = defer.promise;
                var temp = $resource(AppSettings.botsApiUrl + 'api/customers/:userId',
                    {},
                    {
                        query: {
                            method: "GET",
                            isArray: false,
                            headers: {
                                Authorization: AppSettings.authorization,
                                requestObject: null
                            }
                        }
                    }
                );
                var promise = temp.query({
                    userId: USERIDS[id]["botsId"]
                });
                promise.$promise.then(function (data) {
                    data.result[0]["appData"] = USERIDS[id]["appData"];
                    defer.resolve(data);
                    console.log(data);
                });

                return rs;
            },
            getSelf: function () {
                return $http({
                    method: 'GET',
                    url: AppSettings.botsApiUrl + 'api/accounts/self/;',
                });
            }
        };
    });