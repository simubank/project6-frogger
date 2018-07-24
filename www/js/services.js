angular.module('app.services', [])

.factory('Events', function($q) {

	var incrementDate = function (date, amount) {
			var tmpDate = new Date(date);
			tmpDate.setDate(tmpDate.getDate() + amount)
			return tmpDate;
	};

	//create fake events, but make it dynamic so they are in the next week
    var fakeEvents = [];
    fakeEvents.push(
		{
			"title":"Tour of Jenn's House at 4326 Mulberry Drive",
			"description":"Don't forget to remind your housemates!!",
			"date":incrementDate(new Date(), 2)
		}	
	);
	fakeEvents.push(
		{
			"title":"House tour on 155 Scholar Lane",
			"description":"Meetup with Ian to view the house",
			"date":incrementDate(new Date(), 1)
		}	
	);
	
	
	var getEvents = function() {
			var deferred = $q.defer();
			deferred.resolve(fakeEvents);
			return deferred.promise;
	}
	
  return {
		get:getEvents
  };

});