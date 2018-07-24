angular.module('app.controllers')

    .controller('comparisonCtrl', ['$scope', '$stateParams', 'BotsService', 'User', 'HouseListingService', '$ionicModal', '$timeout', '$filter', 'UserService',
        function ($scope, $stateParams, BotsService, User, HouseListingService, $ionicModal, $timeout, $filter, UserService) {
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

            
            $scope.chartSettings = {
                heading: "",
                title: {
                    display: true,
                    text: 'Cost per month'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            };
            
            function setUpLocationData(id1, id2) {
                $scope.listings = [
                    HouseListingService.getListing(id1),
                    HouseListingService.getListing(id2)
                ];
    
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
            }

            setUpLocationData(0, 3);

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

            function setUserInfo() {
                BotsService.getUser(UserService.getCurrentUser()).then(function (data) {
                    $scope.user = new User(data);
                    $scope.user.getIncome().then(function (res) {
                        $scope.userIncome = res.toFixed(2);
                        console.log('user set', res);
                    }).catch(function () {
                        $scope.userIncome = 3000;
                    });
                });
            }

            setUserInfo();

            $scope.$on('UserChange', function () {
                setUserInfo();
            });

            $scope.$on('ComparisonIDChange', function (event, args) {
                setUpLocationData(args[0], args[1]);
            });

            $ionicModal.fromTemplateUrl('templates/comparisonCharts/value-view.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
            });

            $ionicModal.fromTemplateUrl('templates/comparisonCharts/safety-view.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.safetyModal = modal;
            });

            $ionicModal.fromTemplateUrl('templates/comparisonCharts/walk-view.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.walkModal = modal;
            });

            $scope.openValueModal = function (index) {
                $scope.detailViewId = index;
                $scope.incomeData = [$scope.userIncome, $scope.valueData[index]];
                $scope.series = $scope.labels;
                $scope.chartSettings.title.text = "Rent to Income";
                $scope.modal.show();
            };


            $scope.openSafetyModal = function (index) {
                $scope.detailViewId = index;
                $scope.safetyData = [$scope.averageSafetyScore, $scope.safetyScoreData[index]];
                $scope.safetyLabels = ['Average', 'This Property'];
                $scope.series = ['Crime Average', 'This Area'];
                $scope.chartSettings.title.text = "National Safety Score vs Property";
                $scope.safetyModal.show();
            };

            $scope.openWalkModal = function (index) {
                $scope.detailViewId = index;
                $scope.walkData = [$scope.averageWalkScore, $scope.walkScoreData[index]];
                $scope.walkLabels = ['Average', 'This Property'];
                $scope.series = ['Average', 'This Property'];
                $scope.chartSettings.title.text = "National Walk Score vs Property";
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
            $scope.closeValueModal = function () {
                $scope.modal.hide();
                $scope.safetyModal.hide();
            };
        }])