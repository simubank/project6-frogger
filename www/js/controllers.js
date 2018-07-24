angular.module('app.controllers', ["tdnb.services", "app.directives"])

    .controller('postingsCtrl', ['$state','$scope', '$filter', '$stateParams', 'BotsService', 'User', 'HouseListingService', '$ionicModal', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($state, $scope, $filter, $stateParams, BotsService, User, HouseListingService, $ionicModal, $timeout) {

            $scope.maxRecent = 5;
            $scope.recentlyViewedNum = 2;
            $scope.lowerPrice = {price: 0};
            $scope.higherPrice = {price: 20000};
            $scope.availableHouses = 2;

            $scope.checked = false;
            $scope.map = false;
            $scope.showFilter = false;

            $scope.allFilters = {
                "rooms": {
                    name: "Rooms and Beds",
                    type: [{
                        name: "Bedrooms",
                        count: 0
                    }, {
                        name: "Washrooms",
                        count: 0
                    }],
                    show: false,
                    number: 0
                },
                "utilities": {
                    name: "Utilities",
                    type: [{
                        name: "Internet",
                        checked: false
                    }, {
                        name: "Hydro",
                        checked: false
                    }, {
                        name: "Gas",
                        checked: false
                    }, {
                        name: "Cabel TV",
                        checked: false
                    }, {
                        name: "Laundry",
                        checked: false
                    }, {
                        name: "Funished",
                        checked: false
                    }, {
                        name: "Air conditioning",
                        checked: false
                    }],
                    show: false,
                    number: 0
                },
                "price": {
                    name: "Price",
                    min: $scope.lowerPrice,
                    max: $scope.higherPrice,
                    show: false,
                    number: 0
                },
                "propertyType": {
                    name: "Property Type",
                    type: [{
                        name: "House",
                        checked: false
                    }, {
                        name: "Apartment",
                        checked: false
                    }],
                    show: false,
                    number: 0
                },
                "facilities": {
                    name: "Facilities",
                    type: [{
                        name: "Free Parking on premises",
                        checked: false
                    }, {
                        name: "Gym",
                        checked: false
                    }, {
                        name: "Common room",
                        checked: false
                    }],
                    show: false,
                    number: 0
                },
                "houseRules": {
                    name: "House Rules",
                    type: [{
                        name: "Pets allowed",
                        checked: false
                    }, {
                        name: "Quiet hours",
                        checked: false
                    }],
                    show: false,
                    number: 0
                }
            }

            var activeFilters = [
            ];

            $scope.recentlyViewed = HouseListingService.getAllListings();

            $scope.appliedFilters = 0;

            $scope.changePin = function () {
                $scope.checked = !$scope.checked;
            }

            $scope.applyFilter = function (code) {

                if (!$scope.activeFilters.includes(code) && code.number > 0) {
                    code.show = true;
                    $scope.activeFilters.push(code);
                    $scope.appliedFilters += 1;
                } else if ($scope.activeFilters.includes(code) && code.number == 0) {
                    clearFilter(code);
                }
            };

            $scope.navigatePosting = function(index){
                var toPageParams = $scope.recentlyViewed[index];
                console.log(toPageParams);
                $state.go('app.viewPosting', toPageParams);
            }

            $scope.clearAllFilters = function () {
                $scope.appliedFilters = 0;
                angular.forEach($scope.activeFilters, function (value, key) {
                    $scope.clearFilter(value);
                });
                activeFilters = [];
            }

            $scope.clearFilter = function (filter) {
                filter.show = false;
                filter.number = 0;
                if (filter.name === "Price") {
                    $scope.lowerPrice.price = 0;
                    $scope.higherPrice.price = 20000;
                    $scope.allFilters.price.number = 0;
                } else {
                    angular.forEach(filter.type, function (value, key) {
                        if (value.checked) {
                            value.checked = false;
                        } else {
                            value.count = 0;
                        }
                    });
                }
                var x = $scope.activeFilters.indexOf(filter);
                $scope.activeFilters.splice(x, 1);
                $scope.appliedFilters -= 1;
            }

            $scope.click = function () {
                $scope.map = !$scope.map;
            };

            $scope.openCloseFilter = function () {
                $scope.showFilter = !$scope.showFilter;
            }

            $scope.save = function (value) {
                value.saved = !value.saved;
            }

            $scope.activeFilters = activeFilters;


            $scope.add = function (room, code) {
                room.count += 1;
                code.number += 1;
                $scope.applyFilter(code);
            }

            $scope.sub = function (room, code) {
                room.count -= 1;
                code.number -= 1;
                if (code.number === 0) {
                    $scope.clearFilter(code);
                }

            }

            $scope.check = function (value, code) {
                value.checked = !value.checked;
                // console.log(value);
                // console.log(value.checked);
                if (value.checked) {
                    code.number += 1;
                } else {
                    code.number -= 1;
                }
                // console.log($scope.allFilters.propertyType);   
                $scope.applyFilter(code);
            }

            $scope.$watch("lowerPrice.price", function(newValue){
                $scope.lowerPrice.price = newValue;
                
                if(newValue != 0) {
                    $scope.allFilters.price.number += 1;
                    $scope.applyFilter($scope.allFilters.price);
                }
              // console.log($scope.lowerPrice.price); 
            }, true);

            $scope.$watch("higherPrice.price", function(newValue){
                $scope.higherPrice.price = newValue;
                ;
                if(newValue != 20000) {
                    $scope.allFilters.price.number += 1
                    $scope.applyFilter($scope.allFilters.price);
                }
               console.log($scope.higherPrice.price); 
               console.log($scope.allFilters.price.number);
            }, true);
            
            

            ////MAP///////////////////////////////////////////////////
            var markers = [];

            $scope.mapRecent = new google.maps.Map(document.getElementById('mapRecent'), {
                center: { lat: 43.653226, lng: -79.38318429999998 },
                zoom: 8
            });

            angular.forEach($scope.recentlyViewed, function (value, key) {
                var x = {
                    mark: new google.maps.Marker(
                        {
                            position: {
                                lat: value.posting_details.location.lat,
                                lng: value.posting_details.location.long
                            },
                            map: $scope.mapRecent,
                            title: "Waterloo"
                        }),

                    message: new google.maps.InfoWindow({
                        content: "sdf"
                    })
                }
                x.mark.addListener('click', function () {
                    closeallwindows();
                    x.message.open($scope.mapRecent, x.mark);
                });
                markers.push(x);
            });

            function closeallwindows() {
                markers.forEach(function (marker) {
                    marker.message.close($scope.mapRecent, marker);
                });
            }


        }])

    .controller('shortlistCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])
    .controller('applicationsCtrl', ['$scope', '$stateParams', 'Events',
        function ($scope, $stateParams, Events) {
            Events.get().then(function(events) {
                console.log("events", events);	
                $scope.events = events;
            });

        }])
    .controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])
    

    .controller('myProfileCtrl', ['$scope', '$stateParams', 'BotsService', 'User',
        function ($scope, $stateParams, BotsService, User) {
            var vm = this;
            $scope.currentUserId = 0;

            BotsService.getUser(0).then(function (data) {
                $scope.user = new User(data);
                $scope.averageStars = $scope.createStars($scope.user.averageStars());
            });
            $scope.createStars = function (rating) {
                //$scope.clearStars();
                var starRating = [];
                for (var j = 0; j < 5; j++) {
                    if (j <= (rating - 1)) {
                        starRating[j] = "fas fa-star checked";
                    }
                    else if (j !== 0 && rating > j && rating < j + 1) {
                        starRating[j] = "fas fa-star-half checked";
                    }
                    else {
                        starRating[j] = "far fa-star";
                    }
                }
                return starRating;
            }
            $scope.changeRating = function () {
                if ($scope.user)
                    $scope.averageStars = $scope.createStars($scope.user.averageStars());
            }

            $scope.$watch('user.rating', function (newValue, oldValue) {
                $scope.changeRating();
            });

            $scope.clearStars = function () {
                var starRating = ["far fa-star", "far fa-star", "far fa-star", "far fa-star", "far fa-star"];
            }

        }])

    .controller('pageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])

    .controller('createPostingCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {
        }])

    .controller('writeReviewCtrl', ['$rootScope', '$scope', '$stateParams', '$state', 'BotsService', 'User', '$filter',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($rootScope, $scope, $stateParams, $state, BotsService, User, $filter) {
            $scope.starRatingClass = ["far fa-star", "far fa-star", "far fa-star", "far fa-star", "far fa-star"];

            BotsService.getUser(0).then(function (data) {
                $scope.user = new User(data);
            });
            $scope.reviewRating = 0;
            $scope.starHighlight = function (starCount) {
                $scope.reviewRating = 0;
                $scope.starRatingClass = ["far fa-star", "far fa-star", "far fa-star", "far fa-star", "far fa-star"];
                for (var i = 1; i <= starCount + 1; i++) {
                    if (i <= (starCount + 1)) {
                        $scope.starRatingClass[i - 1] = "fas fa-star checked";
                        $scope.reviewRating += 1;
                    }
                    else {
                        $scope.starRatingClass[i - 1] = "far fa-star";
                    }
                }
                return $scope.starRatingClass;
            }

            BotsService.getUser(0).then(function (data) {
                $scope.user = new User(data);
            });
            //this is used to get the data of the user who's profile you are viewing (not your own profile...)
            //BotsService.getViewingUser(0).then(function(data) {
            //$scope.user = new User(data);
            // });
            $scope.cancel = function () {
                $scope.reviewText = "";
                $scope.reviewRating = 0;
                $scope.starHighlight(-1);
                $rootScope.back();
            }
            $scope.submitReview = function () {
                var today = new Date();
                var formattedDate = $filter('date')(today, 'MMMM dd, yyyy');

                var reviewObject = {
                    "review": $scope.reviewText,
                    "name": $scope.user.getFullName(),
                    "id": $scope.user.data.id,
                    "timestamp": formattedDate,
                    "rating": $scope.reviewRating * 1.0
                }
                $scope.user.data.appData.reviews.push(reviewObject);
                $scope.reviewText = "";
                $scope.reviewRating = 0;
                $scope.starHighlight(-1);
                $rootScope.back();
            }

        }])
    .controller('viewProfileCtrl', ['$scope', '$stateParams', 'BotsService', 'User',
        function ($scope, $stateParams, BotsService, User) {
            $scope.currentUserId = 0;

            BotsService.getUser(0).then(function (data) {
                $scope.user = new User(data); //pass in as param here
                $scope.averageStars = $scope.createStars($scope.user.averageStars());
            });

            $scope.createStars = function (rating) {
                var starRating = [];
                for (var j = 0; j < 5; j++) {
                    if (j <= (rating - 1)) {
                        starRating[j] = "fas fa-star checked";
                    }
                    else if (j !== 0 && rating > j && rating < j + 1) {
                        starRating[j] = "fas fa-star-half checked";
                    }
                    else {
                        starRating[j] = "far fa-star";
                    }
                }
                return starRating;
            }
        }])
        
        .controller('viewPostingCtrl', ['$scope', '$stateParams', 
        function ($scope, $stateParams) {
        

        }]);

