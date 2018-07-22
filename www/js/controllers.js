angular.module('app.controllers', ["tdnb.services", "app.directives"])

    .controller('postingsCtrl', ['$scope', '$stateParams', 'BotsService', 'User', 'HouseListingService', '$ionicModal', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, BotsService, User, HouseListingService, $ionicModal, $timeout) {

            $scope.maxRecent = 5;
            $scope.recentlyViewedNum = 2;
            $scope.lowerPrice = 10;
            $scope.higherPrice = 20;
            $scope.availableHouses = 2;

            $scope.checked = false;
            $scope.map = false;
            $scope.filter = false;

            $scope.rooms = [{ name: "Bedrooms", count: 0 }, { name: "Washrooms", count: 0 }];

            $scope.utilities = [{ name: "Bedrooms", checked: false },
            { name: "Washrooms", checked: false }];

            var activeFilters = [
                {
                    filter: "price",
                    show: true
                },
                {
                    filter: "location",
                    show: true
                },
                {
                    filter: "filter A",
                    show: false
                },
                {
                    filter: "filter B",
                    show: true
                },
                {
                    filter: "filter C",
                    show: true
                }
            ];

            $scope.recentlyViewed = HouseListingService.getAllListings();

            $scope.appliedFilters = 0;

            $scope.changePin = function () {
                $scope.checked = !$scope.checked;
            }

            $scope.applyFilter = function (value) {
                activeFilters.push({ filter: value, show: true });
                $scope.appliedFilters += 1;
            };

            $scope.clearFilters = function (value) {
                $scope.appliedFilters = 0;
                activeFilters = [];
            }

            $scope.clear = function (filter) {
                filter.show = false;
            }

            $scope.click = function () {
                $scope.map = !$scope.map;
            };

            $scope.openCloseFilter = function () {
                $scope.filter = !$scope.filter;
            }

            $scope.save = function (value) {
                value.saved = !value.saved;
            }

            $scope.activeFilters = activeFilters;

            $scope.mapRecent = new google.maps.Map(document.getElementById('mapRecent'), {
                center: { lat: 43.653226, lng: -79.38318429999998 },
                zoom: 8
            });

            $scope.add = function (room) {
                room.count += 1;
            }

            $scope.sub = function (room) {
                room.count -= 1;
            }

            var markers = [];

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

    .controller('applicationsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])
    .controller('shortlistCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])
    .controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])
    .controller('comparisonCtrl', ['$scope', '$stateParams', 'BotsService', 'User', 'HouseListingService', '$ionicModal', '$timeout',
        function ($scope, $stateParams, BotsService, User, HouseListingService, $ionicModal, $timeout) {
            $scope.labels = ["Income", "Rent"];
            $scope.data = [3000, 1000];
            $scope.sufficentFunds = true;
            $scope.detailViewId = 0;
            $scope.title = {
                title: {
                    display: true,
                    text: 'Cost per month'
                },
            };

            $scope.listings = [
                HouseListingService.getListing(0),
                HouseListingService.getListing(3)
            ];

            $scope.chartSettings = {
                heading: "",
                title: {
                    display: true,
                    text: 'Cost per month'
                },
            };

            $scope.averageValue = HouseListingService.getMedianRentalValue();
            $scope.averageWalkScore = HouseListingService.getMedianWalkScoreValue();
            $scope.averageSafetyScore = HouseListingService.getMedianSafetyValue();

            $scope.comparisonData = [];

            $scope.valueData = [];
            for (var i = 0; i < $scope.listings.length; i++) {
                $scope.valueData[i] = $scope.listings[i].posting_details.housing_Details.price;
            }

            $scope.walkScoreData = [];
            for (var i = 0; i < $scope.listings.length; i++) {
                $scope.walkScoreData[i] = $scope.listings[i].posting_details.walkscore.walkscore;
            }

            $scope.safetyScoreData = [];
            for (var i = 0; i < $scope.listings.length; i++) {
                $scope.safetyScoreData[i] = $scope.listings[i].posting_details.safetyScore;
            }

            $scope.calculateScore = function (average, value, lowerIsBetter) {
                var result = value / average;
                var score = 0;
                if (result < 1) {
                    score = 0.5 / Math.max(result, 0.5);
                    if (lowerIsBetter) {
                        return (score) * 5;
                    } else {
                        return (1 - score) * 5;
                    }
                } else {
                    score = 1.5 - Math.min(result, 1.5);
                    if (lowerIsBetter) {
                        return (score) * 5;
                    } else {
                        return (1 - score) * 5;
                    }
                }
            };

            $scope.getWeightedScore = function (index) {
                var weightedValue = $scope.calculateScore($scope.averageValue, $scope.valueData[index], true) * .5;
                var weightWalkScore = $scope.calculateScore($scope.averageWalkScore, $scope.walkScoreData[index], false) * .3;
                var weightedSafetyScore = $scope.calculateScore($scope.averageSafetyScore, $scope.safetyScoreData[index], false) * .2;

                return weightedValue + weightWalkScore + weightedSafetyScore;
            };

            BotsService.getUser(9).then(function (data) {
                $scope.user = new User(data);
                $scope.user.getIncome().then(function (res) {
                    $scope.userIncome = res;
                });
            });

            $ionicModal.fromTemplateUrl('/templates/comparisonCharts/value-view.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
            });


            $scope.openValueModal = function (index) {
                $scope.detailViewId = index;
                // $scope.data = [$scope.userIncome, $scope.valueData[index]];

                var portionOfUserIncome = $scope.userIncome - $scope.valueData[index];
                if (portionOfUserIncome < 0) {
                    portionOfUserIncome = 0;
                    $scope.sufficentFunds = false;
                } else {
                    $scope.sufficentFunds = true;
                }
                $scope.data = [portionOfUserIncome, $scope.valueData[index]];
                $scope.modal.show();
            };

            $scope.isHighestValue = function (listObj, average, index) {
                var value1 = $scope.calculateScore(average, listObj[0]);
                var value2 = $scope.calculateScore(average, listObj[1]);

                if (value1 > value2) {
                    return index == 1;
                } else {
                    return index == 0;
                }
            }

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
            // $scope.closeValueModal = function() {
            //   $scope.modal.hide();
            // };
            // // Cleanup the modal when we're done with it!
            // $scope.$on('$destroy', function() {
            //   $scope.modal.remove();
            // });
            // // Execute action on hide modal
            // $scope.$on('modal.hidden', function() {
            //   // Execute action
            // });
            // // Execute action on remove modal
            // $scope.$on('modal.removed', function() {
            //   // Execute action
            // });
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
        }]);

