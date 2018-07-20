angular.module('app.controllers', [])

    .controller('postingsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {

            $scope.maxRecent = 2;
            $scope.recentlyViewedNum = 2;

            $scope.checked = false;
            $scope.map = false;
            $scope.filter = false;

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

            $scope.recentlyViewed = [
                {
                    name: "Waterloo - Lester",
                    images: [
                        {src: "img/0vjW5aZEQ5GKTo5UVCbX_temp1.png"},
                        {src: "img/0vjW5aZEQ5GKTo5UVCbX_temp1.png"}
                    ],
                    description: "student housing etc etc etc.",
                    price: "200",
                    saved: false
                },
                {
                    name: "Waterloo - Lester",
                    images: [
                        {src: "img/0vjW5aZEQ5GKTo5UVCbX_temp1.png"},
                        {src: "img/0vjW5aZEQ5GKTo5UVCbX_temp1.png"}
                    ],
                    description: "student housing etc etc etc.",
                    price: "200",
                    saved: false
                }
            ];

            $scope.appliedFilters = 0;

            $scope.changePin = function(){
                $scope.checked =!$scope.checked;
            }

            $scope.applyFilter = function (value) {
                activeFilters.push({ filter: value, show: true });
                $scope.appliedFilters += 1;
            };

            $scope.clearFilters = function (value) {
                $scope.appliedFilters = 0;
                activeFilters = [];
            }

            $scope.clear = function(filter) {
                filter.show = false;
            }

            $scope.click = function(){
                $scope.map = !$scope.map;
            };

            $scope.openCloseFilter = function(){
                $scope.filter = !$scope.filter;
            }

            $scope.save = function(value){
                value.saved = !value.saved;
            }

            $scope.activeFilters = activeFilters;

        }])

    .controller('applicationsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])

    .controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])

    .controller('myProfileCtrl', ['$scope', '$stateParams',
        function ($scope, $stateParams) {
            $scope.user = {
                "name": "Jon Snow",
                "id": 2000,
                "location": "Toronto, Ontario",
                "description": "Hi! I am currently looking for a place to stay for the upcoming winter!",
                "status": ["Seeking a 1 year lease in Guelph", "Subletting a room in Kitchener for Fall term"],
                "listings": [],
                "reviews": [
                    {
                        "review": "Jon was a very great tenant, who is clean, quiet and is a real leader! 10/10 would lease to again.",
                        "name": "Ned Stark",
                        "id": 3000,
                        "timestamp": "July 15, 2018"
                    },
                    {
                        "review": "An amazing tenant with a great track record...",
                        "name": "Daeneyrs Targaryon",
                        "id": 1000,
                        "timestamp": "June 17, 2017"
                    }
                ]
            }

            console.log($scope.user.reviews[0].name);
            //YOU NEED TO GET USER ID FROM BOTS API!! CHANGE THIS!
        }])

    .controller('pageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])

    .controller('shortlistCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams) {


        }])

