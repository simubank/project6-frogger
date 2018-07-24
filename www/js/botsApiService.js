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
        botsId: "ef7900c7-e404-4418-b517-bee61affe2f7_eb2ff32c-aba3-4e4b-bd5b-03190fef76fb",
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
        botsId: "ef7900c7-e404-4418-b517-bee61affe2f7_b35ea8b6-3fa1-412d-ad4e-14134f58ceb7",
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
        botsId: "ef7900c7-e404-4418-b517-bee61affe2f7_f70a3064-a208-4282-aa56-8b7099056dcc",
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
        botsId: "ef7900c7-e404-4418-b517-bee61affe2f7_26b31f74-69bc-4c36-9ae8-5ae30dc8914b",
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
        botsId: "ef7900c7-e404-4418-b517-bee61affe2f7_7e789538-8cf3-46b3-95a4-81e5d8a2a6a7",
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
        botsId: "ef7900c7-e404-4418-b517-bee61affe2f7_046815a5-8e94-40a6-ac96-3188710abb0c",
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
        botsId: "ef7900c7-e404-4418-b517-bee61affe2f7_de3e92ed-24d8-4e8f-949c-25079f270ef2",
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
        botsId: "ef7900c7-e404-4418-b517-bee61affe2f7_29d67bc2-e6a4-43bf-99ec-d5ff2aaa8ddb",
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
    }
];

var LANDOWNERS = [

];

angular.module('tdnb.services', [])
    .run(function ($http) {
        $http.defaults.headers.common.Authorization = AppSettings.authorization;
    })
    .factory('User', function ($resource, $q) {

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

        function monthDiff(d1, d2) {
            var months;
            months = (d2.getFullYear() - d1.getFullYear()) * 12;
            months -= d1.getMonth() + 1;
            months += d2.getMonth();
            return months <= 0 ? 0 : months;
        }

        /**
         * Public method, assigned to prototype
         */
        User.prototype.getFullName = function () {
            return this.data.userData.givenName + ' ' + this.data.userData.surname;
        };

        User.prototype.getLocation = function () {
            return this.data.userData.addresses.principalResidence.municipality;
        };

        User.prototype.getRating = function () {
            var rating = 0;
            for (var i = 0; i < this.data.appData['reviews'].length; i++) {
                rating += this.data.appData['reviews'][i].rating;
            }
            rating = rating / (this.data.appData['reviews'].length);
            User.prototype.updateRating(rating);
            return rating;
        };

        User.prototype.averageStars = function () {
            var rating = 0;
            for (var i = 0; i < this.data.appData['reviews'].length; i++) {
                rating += this.data.appData['reviews'][i].rating;
            }
            rating = rating / (this.data.appData['reviews'].length);
            return rating;
        };

        User.prototype.getIncome = function () {
            var deferred = $q.defer();
            var transactionsQuery = $resource(AppSettings.botsApiUrl + 'api/customers/:userId/transactions',
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
            var transactionsPromise = transactionsQuery.query({
                userId: this.data.botsId
            });
            transactionsPromise.$promise.then(function (transactionsRes) {
                var total = 0;
                var minDate = new Date();
                var topDate = new Date();
                for (var i = 0; i < transactionsRes.result.length; i++) {
                    for (var j = 0; j < transactionsRes.result[i].categoryTags.length; j++) {
                        if (transactionsRes.result[i].categoryTags[j].toLowerCase() === "salary") {
                            var transDate = new Date(transactionsRes.result[i].originationDate);
                            total += transactionsRes.result[i].currencyAmount;
                            if (transDate > topDate) {
                                topDate = transDate;
                            }
                            if (transDate < minDate) {
                                minDate = transDate;
                            }
                        }
                    }
                }
                if (total !== 0) {
                    deferred.resolve(total / (monthDiff(minDate, topDate)));
                } else {
                    deferred.resolve(total);
                }
            });
            return deferred.promise;
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
                var userObj = USERIDS[id];

                rs = defer.promise;
                var userData = $resource(AppSettings.botsApiUrl + 'api/customers/:userId',
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

                var accountQuery = $resource(AppSettings.botsApiUrl + 'api/customers/:userId/accounts',
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

                var userPromise = userData.query({
                    userId: USERIDS[id]["botsId"]
                });

                var accountPromise = accountQuery.query({
                    userId: USERIDS[id]["botsId"]
                });



                userPromise.$promise.then(function (userRes) {
                    userObj.userData = userRes.result[0];
                    accountPromise.$promise.then(function (accountRes) {
                        userObj.accountData = accountRes.result;
                        defer.resolve(userObj);
                    });
                });

                return rs;
            }
        };
    }).factory('HouseListingService', function ($http, $resource, $q) {
        var listings = [
            {
                name: "Waterloo - Lester",
                images: [
                    { src: "img/0vjW5aZEQ5GKTo5UVCbX_temp1.png" },
                    { src: "img/0vjW5aZEQ5GKTo5UVCbX_temp1.png" }
                ],
                description: "student housing etc etc etc.",
                saved: false,
                "posting_details": {
                    "avaliable": "true",
                    "location": {
                        "long": 43.2900,
                        "lat": 80.3154
                    },
                    "avaliable_dates": {
                        "from": "09/05/18",
                        "to": "04/01/19"
                    },
                    "guests_required": 2,
                    "housing_Details": {
                        "price": 1450,
                        "type": "House",
                        "shared_common_space": "false",
                        "bedroom": {
                            "number": 3,
                            "shared": "false"
                        },
                        "bathroom": {
                            "number": 1,
                            "shared": "false"
                        },
                        "furnished": "false",
                        "pet_friendly": "false",
                        "smoking": "true",
                        "utilities_included": {
                            "hydro": "false",
                            "electricity": "true",
                            "wifi": "false"
                        }
                    },
                    "safetyScore": 4,
                    "walkscore": {
                        "status": 1,
                        "walkscore": 80,
                        "description": "Comfortable for Walkers",
                        "updated": "2016-11-17 04:40:31.218250",
                        "logo_url": "https://cdn.walk.sc/images/api-logo.png",
                        "more_info_icon": "https://cdn.walk.sc/images/api-more-info.gif",
                        "more_info_link": "https://www.walkscore.com/how-it-works/",
                        "ws_link": "https://www.walkscore.com/score/1119-8th-Avenue-Seattle-WA-98101/lat=47.6085/lng=-122.3295/?utm_source=walkscore.com&utm_medium=ws_api&utm_campaign=ws_api",
                        "help_link": "https://www.walkscore.com/how-it-works/",
                        "snapped_lat": 43.4643,
                        "snapped_lon": -122.3295,
                        "transit": {
                            "score": 75,
                            "description": "Somewhat Rider's",
                            "summary": "30 nearby routes: 20 bus, 6 rail, 4 other"
                        },
                        "bike": {
                            "score": 51,
                            "description": "Somewhat bikeable"
                        }
                    },
                    "additional_info":
                        {
                            "comments": "Pool with sauna and hottub"

                        },
                    "owner_rating": 4.2
                }
            },
            {
                "name": "Waterloo - Lester",
                "images": [
                    { "src": "img/0vjW5aZEQ5GKTo5UVCbX_temp1.png" },
                    { "src": "img/0vjW5aZEQ5GKTo5UVCbX_temp1.png" }
                ],
                "description": "student housing etc etc etc.",
                "saved": false,
                "posting_details": {
                    "avaliable": "true",
                    "location": {
                        "long": 43.2814,
                        "lat": 80.3438
                    },
                    "avaliable_dates": {
                        "from": "09/10/18",
                        "to": "05/01/19"
                    },
                    "guests_required": 1,
                    "housing_Details": {
                        "price": 1400,
                        "type": "House",
                        "shared_common_space": "true",
                        "bedroom": {
                            "number": 1,
                            "shared": "false"
                        },
                        "bathroom": {
                            "number": 1,
                            "shared": "false"
                        },
                        "furnished": "true",
                        "pet_friendly": "false",
                        "smoking": "true",
                        "utilities_included": {
                            "hydro": "true",
                            "electricity": "true",
                            "wifi": "true"
                        }
                    },
                    "safetyScore": 6,
                    "walkscore": {
                        "status": 1,
                        "walkscore": 40,
                        "description": "Poor for Walkers",
                        "updated": "2016-11-17 04:40:31.218250",
                        "logo_url": "https://cdn.walk.sc/images/api-logo.png",
                        "more_info_icon": "https://cdn.walk.sc/images/api-more-info.gif",
                        "more_info_link": "https://www.walkscore.com/how-it-works/",
                        "ws_link": "https://www.walkscore.com/score/1119-8th-Avenue-Seattle-WA-98101/lat=47.6085/lng=-122.3295/?utm_source=walkscore.com&utm_medium=ws_api&utm_campaign=ws_api",
                        "help_link": "https://www.walkscore.com/how-it-works/",
                        "snapped_lat": 43.4643,
                        "snapped_lon": -122.3295,
                        "transit": {
                            "score": 60,
                            "description": "Somewhat Rider's friendly",
                            "summary": "20 nearby routes: 10 bus, 6 rail, 4 other"
                        },
                        "bike": {
                            "score": 45,
                            "description": "Somewhat bikeable"
                        }
                    },
                    "additional_info":
                        {
                            "comments": "Wonderful house in a nice neighborhood"

                        },
                    "owner_rating": 4.5
                }
            },
            {
                "name": "Waterloo - Lester",
                "images": [
                    { "src": "img/0vjW5aZEQ5GKTo5UVCbX_temp1.png" },
                    { "src": "img/0vjW5aZEQ5GKTo5UVCbX_temp1.png" }
                ],
                "description": "student housing etc etc etc.",
                "saved": false,
                "posting_details": {
                    "avaliable": "true",
                    "location": {
                        "long": 43.2814,
                        "lat": 80.3438
                    },
                    "avaliable_dates": {
                        "from": "09/10/18",
                        "to": "05/01/19"
                    },
                    "guests_required": 1,
                    "housing_Details": {
                        "price": 1400,
                        "type": "House",
                        "shared_common_space": "true",
                        "bedroom": {
                            "number": 1,
                            "shared": "false"
                        },
                        "bathroom": {
                            "number": 1,
                            "shared": "false"
                        },
                        "furnished": "true",
                        "pet_friendly": "false",
                        "smoking": "true",
                        "utilities_included": {
                            "hydro": "true",
                            "electricity": "true",
                            "wifi": "true"
                        }
                    },
                    "safetyScore": 7,
                    "walkscore": {
                        "status": 1,
                        "walkscore": 40,
                        "description": "Poor for Walkers",
                        "updated": "2016-11-17 04:40:31.218250",
                        "logo_url": "https://cdn.walk.sc/images/api-logo.png",
                        "more_info_icon": "https://cdn.walk.sc/images/api-more-info.gif",
                        "more_info_link": "https://www.walkscore.com/how-it-works/",
                        "ws_link": "https://www.walkscore.com/score/1119-8th-Avenue-Seattle-WA-98101/lat=47.6085/lng=-122.3295/?utm_source=walkscore.com&utm_medium=ws_api&utm_campaign=ws_api",
                        "help_link": "https://www.walkscore.com/how-it-works/",
                        "snapped_lat": 43.4643,
                        "snapped_lon": -122.3295,
                        "transit": {
                            "score": 60,
                            "description": "Somewhat Rider's friendly",
                            "summary": "20 nearby routes: 10 bus, 6 rail, 4 other"
                        },
                        "bike": {
                            "score": 45,
                            "description": "Somewhat bikeable"
                        }
                    },
                    "additional_info":
                        {
                            "comments": "Wonderful house in a nice neighborhood"

                        },
                    "owner_rating": 4.5
                }
            },
            {
                "name": "Waterloo - Lester",
                "images": [
                    { "src": "img/0vjW5aZEQ5GKTo5UVCbX_temp1.png" },
                    { "src": "img/0vjW5aZEQ5GKTo5UVCbX_temp1.png" }
                ],
                "description": "student housing etc etc etc.",
                "saved": false,
                "posting_details": {
                    "avaliable": "true",
                    "location": {
                        "long": 43.2829,
                        "lat": 80.3217
                    },
                    "avaliable_dates": {
                        "from": "09/01/18",
                        "to": "04/01/19"
                    },
                    "guests_required": 1,
                    "housing_Details": {
                        "price": 900,
                        "type": "Apartment",
                        "shared_common_space": "true",
                        "bedroom": {
                            "number": 2,
                            "shared": "false"
                        },
                        "bathroom": {
                            "number": 1,
                            "shared": "true"
                        },
                        "furnished": "true",
                        "pet_friendly": "false",
                        "smoking": "false",
                        "utilities_included": {
                            "hydro": "true",
                            "electricity": "true",
                            "wifi": "false"
                        }
                    },
                    "safetyScore": 4.5,
                    "walkscore": {
                        "status": 1,
                        "walkscore": 87,
                        "description": "Comfortable for Walkers",
                        "updated": "2016-11-17 04:40:31.218250",
                        "logo_url": "https://cdn.walk.sc/images/api-logo.png",
                        "more_info_icon": "https://cdn.walk.sc/images/api-more-info.gif",
                        "more_info_link": "https://www.walkscore.com/how-it-works/",
                        "ws_link": "https://www.walkscore.com/score/1119-8th-Avenue-Seattle-WA-98101/lat=47.6085/lng=-122.3295/?utm_source=walkscore.com&utm_medium=ws_api&utm_campaign=ws_api",
                        "help_link": "https://www.walkscore.com/how-it-works/",
                        "snapped_lat": 43.4643,
                        "snapped_lon": -122.3295,
                        "transit": {
                            "score": 100,
                            "description": "Rider's Paradise",
                            "summary": "115 nearby routes: 103 bus, 6 rail, 6 other"
                        },
                        "bike": {
                            "score": 51,
                            "description": "Somewhat bikeable"
                        }
                    },
                    "additional_info":
                        {
                            "comments": "There is a gym near by with a swimming pool."

                        },
                    "owner_rating": 3.3
                }

            },
            {
                "name": "Waterloo - Lester",
                "images": [
                    { "src": "img/0vjW5aZEQ5GKTo5UVCbX_temp1.png" },
                    { "src": "img/0vjW5aZEQ5GKTo5UVCbX_temp1.png" }
                ],
                "description": "student housing etc etc etc.",
                "saved": false,
                "posting_details": {
                    "avaliable": "true",
                    "location": {
                        "long": 43.2754,
                        "lat": 80.3248
                    },
                    "avaliable_dates": {
                        "from": "09/11/18",
                        "to": "06/01/19"
                    },
                    "guests_required": 1,
                    "housing_Details": {
                        "price": 1850,
                        "type": "House",
                        "shared_common_space": "true",
                        "bedroom": {
                            "number": 1,
                            "shared": "false"
                        },
                        "bathroom": {
                            "number": 1,
                            "shared": "false"
                        },
                        "furnished": "true",
                        "pet_friendly": "true",
                        "smoking": "true",
                        "utilities_included": {
                            "hydro": "true",
                            "electricity": "true",
                            "wifi": "true"
                        }
                    },
                    "safetyScore": 5,
                    "walkscore": {
                        "status": 1,
                        "walkscore": 90,
                        "description": "Comfortable for Walkers",
                        "updated": "2016-11-17 04:40:31.218250",
                        "logo_url": "https://cdn.walk.sc/images/api-logo.png",
                        "more_info_icon": "https://cdn.walk.sc/images/api-more-info.gif",
                        "more_info_link": "https://www.walkscore.com/how-it-works/",
                        "ws_link": "https://www.walkscore.com/score/1119-8th-Avenue-Seattle-WA-98101/lat=47.6085/lng=-122.3295/?utm_source=walkscore.com&utm_medium=ws_api&utm_campaign=ws_api",
                        "help_link": "https://www.walkscore.com/how-it-works/",
                        "snapped_lat": 43.4643,
                        "snapped_lon": -122.3295,
                        "transit": {
                            "score": 96,
                            "description": "Rider's Paradise",
                            "summary": "115 nearby routes: 103 bus, 6 rail, 6 other"
                        },
                        "bike": {
                            "score": 51,
                            "description": "Somewhat bikeable"
                        }
                    },
                    "additional_info":
                        {
                            "comments": "There is a gym near by with a swimming pool."

                        },
                    "owner_rating": 4.3
                }
            },
            {
                "name": "Waterloo - Lester",
                "images": [
                    { "src": "img/0vjW5aZEQ5GKTo5UVCbX_temp1.png" },
                    { "src": "img/0vjW5aZEQ5GKTo5UVCbX_temp1.png" }
                ],
                "description": "student housing etc etc etc.",
                "saved": false,
                "posting_details": {
                    "avaliable": "true",
                    "location": {
                        "long": 43.2815,
                        "lat": 80.3300
                    },
                    "avaliable_dates": {
                        "from": "08/01/18",
                        "to": "05/01/19"
                    },
                    "guests_required": 2,
                    "housing_Details": {
                        "price": 1200,
                        "type": "Apartment",
                        "shared_common_space": "true",
                        "bedroom": {
                            "number": 4,
                            "shared": "false"
                        },
                        "bathroom": {
                            "number": 2,
                            "shared": "true"
                        },
                        "furnished": "false",
                        "pet_friendly": "false",
                        "smoking": "true",
                        "utilities_included": {
                            "hydro": "true",
                            "electricity": "true",
                            "wifi": "true"
                        }
                    },
                    "safetyScore": 2,
                    "walkscore": {
                        "status": 1,
                        "walkscore": 95,
                        "description": "Comfortable for Walkers",
                        "updated": "2016-11-17 04:40:31.218250",
                        "logo_url": "https://cdn.walk.sc/images/api-logo.png",
                        "more_info_icon": "https://cdn.walk.sc/images/api-more-info.gif",
                        "more_info_link": "https://www.walkscore.com/how-it-works/",
                        "ws_link": "https://www.walkscore.com/score/1119-8th-Avenue-Seattle-WA-98101/lat=47.6085/lng=-122.3295/?utm_source=walkscore.com&utm_medium=ws_api&utm_campaign=ws_api",
                        "help_link": "https://www.walkscore.com/how-it-works/",
                        "snapped_lat": 43.4643,
                        "snapped_lon": -122.3295,
                        "transit": {
                            "score": 75,
                            "description": "Somewhat Rider's",
                            "summary": "120 nearby routes: 100 bus, 16 rail, 4 other"
                        },
                        "bike": {
                            "score": 68,
                            "description": "Comfortable for biking"
                        }
                    },
                    "additional_info":
                        {
                            "comments": "Pool with sauna and hottub"
                        },
                    "owner_rating": 4.2
                }
            },
            {
                "name": "Waterloo - Lester",
                "images": [
                    { "src": "img/0vjW5aZEQ5GKTo5UVCbX_temp1.png" },
                    { "src": "img/0vjW5aZEQ5GKTo5UVCbX_temp1.png" }
                ],
                "description": "student housing etc etc etc.",
                "saved": false,
                "posting_details": {
                    "avaliable": "true",
                    "location": {
                        "long": 43.2817,
                        "lat": 80.3310
                    },
                    "avaliable_dates": {
                        "from": "08/01/18",
                        "to": "05/01/19"
                    },
                    "guests_required": 1,
                    "housing_Details": {
                        "price": 1400,
                        "type": "Apartment",
                        "shared_common_space": "true",
                        "bedroom": {
                            "number": 2,
                            "shared": "false"
                        },
                        "bathroom": {
                            "number": 1,
                            "shared": "true"
                        },
                        "furnished": "true",
                        "pet_friendly": "false",
                        "smoking": "true",
                        "utilities_included": {
                            "hydro": "true",
                            "electricity": "true",
                            "wifi": "true"
                        }
                    },
                    "safetyScore": 5.6,
                    "walkscore": {
                        "status": 1,
                        "walkscore": 96,
                        "description": "Comfortable for Walkers",
                        "updated": "2016-11-17 04:40:31.218250",
                        "logo_url": "https://cdn.walk.sc/images/api-logo.png",
                        "more_info_icon": "https://cdn.walk.sc/images/api-more-info.gif",
                        "more_info_link": "https://www.walkscore.com/how-it-works/",
                        "ws_link": "https://www.walkscore.com/score/1119-8th-Avenue-Seattle-WA-98101/lat=47.6085/lng=-122.3295/?utm_source=walkscore.com&utm_medium=ws_api&utm_campaign=ws_api",
                        "help_link": "https://www.walkscore.com/how-it-works/",
                        "snapped_lat": 43.4643,
                        "snapped_lon": -122.3295,
                        "transit": {
                            "score": 82,
                            "description": "Somewhat Rider's",
                            "summary": "120 nearby routes: 100 bus, 16 rail, 4 other"
                        },
                        "bike": {
                            "score": 73,
                            "description": "Comfortable for biking"
                        }
                    },
                    "additional_info":
                        {
                            "comments": "On University of Waterloo campus, access to local gym and swimming pool. Shared with 2 other residents."
                        },
                    "owner_rating": 4.2
                }
            }
        ];


        return {
            getListing: function (id) {
                return listings[id];
            },
            getAllListings: function () {
                return listings;
            },
            getMedianRentalValue: function () {
                var average = 0;
                for (var i = 0; i < listings.length; i++) {
                    average += listings[i].posting_details.housing_Details.price;
                }
                return average / listings.length;
            },
            getMedianWalkScoreValue: function() {
                // var average = 0;
                // for (var i = 0; i < listings.length; i++) {
                //     average += listings[i].posting_details.walkscore.walkscore;
                // }
                return 50;
                return average / listings.length;
            },
            getMedianSafetyValue: function () {
                var average = 0;
                for (var i = 0; i < listings.length; i++) {
                    average += listings[i].posting_details.safetyScore;
                }
                return average / listings.length;
            }
        };
    });