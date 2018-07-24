angular.module('app.controllers', ["tdnb.services", "app.directives"])

    .filter('searchFor', function(){

    })

    .controller('postingsCtrl', ['$state','$scope', '$stateParams', 'BotsService', 'User', 'HouseListingService', '$ionicModal', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($state, $scope, $stateParams, BotsService, User, HouseListingService, $ionicModal, $timeout) {

            $scope.maxRecent = 5;
            $scope.recentlyViewedNum = 2;
            $scope.lowerPrice = {price: 0};
            $scope.higherPrice = {price: 20000};
            $scope.availableHouses = 2;

            $scope.checked = false;9
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
                $state.go('app.postingInfo', toPageParams)
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
            
            $scope.showMoreRecent = "Show More";
            $scope.showAllRecents = function() {
                console.log($scope.showMoreRecent);
                if($scope.maxRecent == 5) {
                    $scope.maxRecent = 10;
                    $scope.showMoreRecent = "Show Less"
                    console.log($scope.maxRecent);
                } else {
                    $scope.maxRecent = 5;
                    $scope.showMoreRecent = "Show More";
                }
                
            }

           

            ////MAP///////////////////////////////////////////////////
            var markers = [];

            $scope.mapRecent = new google.maps.Map(document.getElementById('mapRecent'), {
                center: { lat: 43.653226, lng: -79.38318429999998 },
                zoom: 8
            });

            $scope.mapAll = new google.maps.Map(document.getElementById('mapAll'), {
                center: { lat: 43.653226, lng: -89.38318429999998 },
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
        .controller('comparisonCtrl', ['$scope', '$stateParams', 'BotsService', 'User', 'HouseListingService', '$ionicModal', '$timeout', '$filter',
        function ($scope, $stateParams, BotsService, User, HouseListingService, $ionicModal, $timeout, $filter) {
          $scope.incomeLabels = ["Income", "Rent"];
          $scope.labels = ["Income", "Rent"];
          $scope.userIncome = 3000;
    
          $scope.data = [3000, 1000];
          $scope.doughnutChartColors = ['#008000', '#ff6384'];
    
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
            scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
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
              score = Math.min(result, 1.9) / 1.9;
              if (lowerIsBetter) {
                return (1 - score) * 5;
              } else {
                return (score) * 5;
              }
            }
          };
    
          $scope.getWeightedScore = function (index) {
            var weightedValue = $scope.calculateScore($scope.averageValue, $scope.valueData[index], true) * .5;
            var weightWalkScore = $scope.calculateScore($scope.averageWalkScore, $scope.walkScoreData[index], false) * .3;
            var weightedSafetyScore = $scope.calculateScore($scope.averageSafetyScore, $scope.safetyScoreData[index], false) * .2;
    
            return weightedValue + weightWalkScore + weightedSafetyScore;
          };
    
          BotsService.getUser(0).then(function (data) {
            $scope.user = new User(data);
            $scope.user.getIncome().then(function (res) {
              $scope.userIncome = Number($filter('number')(res, 2));
              $scope.userIncome = 300;
            }).catch(function() {
              $scope.userIncome = 3000;
            });
          });
    
          $ionicModal.fromTemplateUrl('/templates/comparisonCharts/value-view.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function (modal) {
            $scope.modal = modal;
          });
    
          $ionicModal.fromTemplateUrl('/templates/comparisonCharts/safety-view.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function (modal) {
            $scope.safetyModal = modal;
          });
    
          $ionicModal.fromTemplateUrl('/templates/comparisonCharts/walk-view.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function (modal) {
            $scope.walkModal = modal;
          });
          
          $scope.openValueModal = function (index) {
            $scope.detailViewId = index;
            $scope.incomeData = [$scope.userIncome, $scope.valueData[index]];
            $scope.series = $scope.labels;
            $scope.chartSettings.title.text = "Rent to income";
            $scope.modal.show();
          };
    
    
          $scope.openSafetyModal = function (index) {
            $scope.detailViewId = index;
            $scope.safetyData = [$scope.averageSafetyScore, $scope.safetyScoreData[index]];
            $scope.safetyLabels = ['Average', 'This Property'];
            $scope.series = ['Crime Average', 'This Area'];
            $scope.chartSettings.title.text = "National safety score vs property";
            $scope.safetyModal.show();
          };
    
          $scope.openWalkModal = function (index) {
            $scope.detailViewId = index;
            $scope.walkData = [$scope.averageWalkScore, $scope.walkScoreData[index]];
            $scope.walkLabels = ['Average', 'This Property'];
            $scope.series = ['Average', 'This Property'];
            $scope.chartSettings.title.text = "National walk score vs property";
            $scope.walkModal.show();
          };
    
          $scope.isHighestValue = function (listObj, average, index, higherIsBetter) {
            if (!angular.isDefined(higherIsBetter)) {
              higherIsBetter = false;
            }
            var value1 = $scope.calculateScore(average, listObj[0], higherIsBetter);
            var value2 = $scope.calculateScore(average, listObj[1], higherIsBetter);
    
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
          $scope.closeValueModal = function() {
            $scope.modal.hide();
            $scope.safetyModal.hide();
          };
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
    .controller('postingInfoCtrl', ['$scope', '$stateParams',
        function($scope, $stateParams){

        }])

    .controller('applicationsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {
            $scope.saved = [{
                src: "img/e0GsJaWSE2TzDBWPmvZQ_phillip-square-i-blair-house-house_terri-meyer-boake4.jpg"
            }, {
                src: "img/EtbJEM8ERHOmSeLdaACn_img_0558.jpg"
            }, {
                src: "img/O1pplughRbqjKLyjgj9Y_meet-icon-skyrise.jpg"
            },{
                src: "img/0vjW5aZEQ5GKTo5UVCbX_temp1.png"
            },{
                src: "img/e0GsJaWSE2TzDBWPmvZQ_phillip-square-i-blair-house-house_terri-meyer-boake4.jpg"
            }];

        }])
    .controller('shortlistCtrl', ['$scope', '$stateParams', 
        function ($scope, $stateParams) {

            $scope.save = function (value) {
                value.saved = !value.saved;
            }


            $scope.iconColor = "black";
            $scope.iconUtil = function(util){
                if(util === "Hydro") {
                    return "ion-waterdrop";
                } else if (util === "Electricity") {
                    return "ion-flash";
                } else if (util == "Wifi") {
                    return "ion-wifi";
                } else if (util == "Accessibility"){
                    return "ion-android-add-circle";
                } else if (util == "Furnished" || util == "Common Area"){
                    return "ion-android-home";
                } else if (util == "Smoking"){
                    return "ion-fireball";
                } else if (util == "Pet Friendly"){
                    return "ion-ios-heart";
                }
            }
            $scope.passed =  {
                name: "Icon",
                images: [
                    { src: "img/0vjW5aZEQ5GKTo5UVCbX_temp1.png" },
                    { src: "img/0vjW5aZEQ5GKTo5UVCbX_temp1.png" }
                ],
                caption: "Expensive place you will never be able to afford on your salary",
                description: "Great location so we hiked up the prices Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fringilla lacus eros, eu pretium dolor pellentesque mattis. Suspendisse potenti. Curabitur mattis magna sed hendrerit congue. Etiam ultricies, sem sit amet imperdiet tincidunt, mi metus semper eros, in aliquam orci justo a lacus. Pellentesque convallis diam in tortor scelerisque tempor. Fusce.",
                saved: false,
                leasor: "Dave",
                "posting_details": {
                    "avaliable": "true",
                    "location": {
                        "long": 43.2900,
                        "lat": 80.3154
                    },
                    "locationCity": "Waterloo",
                    "locationOther": "Lester St, L4E 2N9",
                    "avaliable_dates": {
                        "from": "09/05/18",
                        "to": "04/01/19"
                    },
                    "guests_required": 2,
                    "housing_Details": {
                        "price": 1450,
                        "type": "House",
                        "bedroom": {
                            "number": 3,
                            "shared": "false"
                        },
                        "bathroom": {
                            "number": 1,
                            "shared": "false"
                        },
                        "facilities" : [
                            {
                                name: "Common Area"
                            }
                        ],
                        "house_rules" : [
                            {
                                name: "Pet Friendly"
                            },
                            {
                                name: "Smoking"
                            }
                        ],
                        
                        "utilities_included": [
                            {
                                name: "Hydro"
                            },
                            {
                                name: "Electricity"
                            },
                            {
                                name: "Wifi"
                            },
                            {
                                name: "Accessibility"
                            },
                            {
                                name: "Furnished"
                            }
                        ]
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
                            "score": 49,
                            "description": "Somewhat bikeable"
                        }
                    },
                    "additional_info":
                        {
                            "comments": "Pool with sauna and hottub"

                        },
                    "owner_rating": 4.2
                }
            }

            var appraisal = function() {
                var x = $scope.passed.posting_details.owner_rating;
                if(x <= 1) {
                    $scope.appraisal = "Poor";
                    $scope.appraise = "#e5381d";
                } else if (x <= 2) {
                    $scope.appraisal = "Adequate";
                    $scope.appraise = "#e57d1c";
                } else if (x <= 3) {
                    $scope.appraisal = "Good";
                    $scope.appraise = "#e8d52f";
                } else if (x <= 4){
                    $scope.appraisal = "Great";
                    $scope.appraise = "#4278b2";
                } else if (x <= 5) {
                    $scope.appraisal = "Excellent";
                    $scope.appraise = "#61bc16" ;
                } else {
                    $scope.appraisal = "New";
                }
            }
            appraisal();

            var appraisalWalk = function() {
                var x = $scope.passed.posting_details.walkscore.walkscore;
                if(x <= 10) {
                    $scope.appraiseWalk = "#e5381d";
                } else if (x <= 30) {
                    $scope.appraiseWalk = "#e57d1c";
                } else if (x <= 50) {
                    $scope.appraiseWalk = "#e8d52f";
                } else if (x <= 80){
                    $scope.appraiseWalk = "#4278b2";
                } else if (x <= 100) {
                    $scope.appraiseWalk = "#61bc16" ;
                }
            }

            appraisalWalk();

            var appraisalTransit = function() {
                var x = $scope.passed.posting_details.walkscore.transit.score;
                if(x <= 10) {
                    $scope.appraiseTransit = "#e5381d";
                } else if (x <= 30) {
                    $scope.appraiseTransit= "#e57d1c";
                } else if (x <= 50) {
                    $scope.appraiseTransit = "#e8d52f";
                } else if (x <= 80){
                    $scope.appraiseTransit = "#4278b2";
                } else if (x <= 100) {
                    $scope.appraiseTransit = "#61bc16" ;
                }
            }

            appraisalTransit();

            var appraisalBike = function() {
                var x = $scope.passed.posting_details.walkscore.bike.score;
                console.log(x);
                if(x <= 10) {
                    $scope.appraiseBike = "#e5381d";
                } else if (x <= 30) {
                    $scope.appraiseBike= "#e57d1c";
                } else if (x <= 50) {
                    $scope.appraiseBike = "#e8d52f";
                } else if (x <= 80){
                    $scope.appraiseBike= "#4278b2";
                } else if (x <= 100) {
                    $scope.appraiseBike = "#61bc16" ;
                }
            }

            appraisalBike();

            $scope.map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: $scope.passed.posting_details.location.lat, lng: $scope.passed.posting_details.location.long },
                zoom: 5
            });

            var marker = new google.maps.Marker({position: {lat: $scope.passed.posting_details.location.lat,
                lng: $scope.passed.posting_details.location.long }, map:$scope.map});

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

