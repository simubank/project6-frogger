// Need to move this out eventually
var AppSettings = {
    authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDQlAiLCJ0ZWFtX2lkIjoiMjgxMzc3NSIsImV4cCI6OTIyMzM3MjAzNjg1NDc3NSwiYXBwX2lkIjoiZWY3OTAwYzctZTQwNC00NDE4LWI1MTctYmVlNjFhZmZlMmY3In0.PnkBgnHrDoyPLOeVd2LebEu7_e1aW3EnZwXD48Zf1Zk',
    botsApiUrl: 'https://dev.botsfinancial.com/'
};

var USERIDS = [
    {
        botsId: "ef7900c7-e404-4418-b517-bee61affe2f7_b5341fc4-f6d6-41a4-9562-d6ce55dce387"
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
        botsId: "ef7900c7-e404-4418-b517-bee61affe2f7_9df5822f-6802-4942-a734-b999b50cbb19"
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
    .run(function($http) {
        $http.defaults.headers.common.Authorization = AppSettings.authorization;
    })

    .factory('BotsService', function ($http, $resource, $q) {
        return {
            getUser: function(id) {
                var rs;
                var defer = $q.defer();
                rs = defer.promise;
                var temp = $resource(AppSettings.botsApiUrl + 'api/customers/:userId',
                    {},
                    {query: {
                        method: "GET",
                        isArray: false,
                        headers: {
                            Authorization: AppSettings.authorization,
                            requestObject: null
                        }
                    }}
                );
                var promise = temp.query({
                    userId: USERIDS[id]["botsId"]
                });
                promise.$promise.then(function(data) {
                    data.result[0]["applicationData"] = {
                        
                    };
                    defer.resolve(data);
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