define(['buildapps'], function (buildapps) {
	
	buildapps.factory('GetEventService', ['$http', function($http){
		
				var geturl = "/Exerciseproject/Testpackage";
				var createurl = "/Exerciseproject/CreatePackage";
				var deleteurl = "/Exerciseproject/DeletePackage";
				var getEvents = {};

				getEvents.Allevents = function(){
				return $http.get(geturl);

			}
				getEvents.Editevents = function(editdata){
					return $http({
						method: 'POST',
						headers: {'Content-Type': 'application/json; charset=UTF-8'},
						url: geturl,
						data: editdata
					})

				}
				getEvents.Createevents = function(createdata){
					return $http({
						method: 'POST',
						headers: {'Content-Type': 'application/json; charset=UTF-8'},
						url: createurl,
						data: createdata
					})

				}
				getEvents.Deleteevents = function(deletedata){
					return $http({
						method: 'POST',
						headers: {'Content-Type': 'application/json; charset=UTF-8'},
						url: deleteurl,
						data: deletedata
					})

				}

			return getEvents;
		}]);
	
});