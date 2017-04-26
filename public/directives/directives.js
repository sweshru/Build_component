define(['buildapps'], function (buildapps) {
	buildapps
	.directive('myDataGrid',function(){
	    return{
	        restrict: 'E',
	        scope:{
	            info:'=info'
	        },
	        templateUrl : 'directives/grid.html',
	        link:function(scope,element){
	            element.css('width','400px');
	            element.css('overflow-x','scroll');
	            scope.currentpage = 0;
	            scope.pagesize = 5;
	            scope.$watch('info', function() {
	            	 scope.numberOfpages = function(){
	         	    	return Math.ceil(scope.info.length/scope.pagesize);
	         	    }
	            	 scope.colval =[];
	 	            for(var l=0;l<1;l++){
	 	                var temparray = scope.info[l];
	 	                for(key in temparray){
	 	                    scope.colval.push(key);
	 	                }
	 	            }
	            });
	            
	        }
	    }
	})
	.filter('startFrom', function() {
	    return function(input, start) {
	        if (!angular.isArray(input)) {
	            return [];
	        }
	        start = +start; //parse to int
	        return input.slice(start);
	    }
	})
	.directive('ddDraggable',function(){
	    return {
	        restrict: "A",
	        link: function(scope, element, attributes, ctlr) {
	            element.attr("draggable", true);

	            element.bind("dragstart", function(eventObject) {
	                eventObject.originalEvent.dataTransfer.setData("text", attributes.itemid);
	                console.log(attributes.itemid);
	            });
	        }
	    };
	})
	.directive('ddDropTarget',function(){
	    return {
	        restrict: "A",
	        link: function (scope, element, attributes, ctlr) {

	            element.bind("dragover", function(eventObject){
	                eventObject.preventDefault();
	            });

	            element.bind("drop", function(eventObject) {

	                // invoke controller/scope move method
	                scope.moveToBox(eventObject.originalEvent.dataTransfer.getData("text"));

	                // cancel actual UI element from dropping, since the angular will recreate a the UI element
	                eventObject.preventDefault();
	            });
	        }
	    };
	})
	.filter('filterBy', function() {
	    return function(array, query) {
	    
	        var parts = query && query.trim().split(/\s+/),
	            keys = Object.keys(array[0]);
	    
	        if (!parts || !parts.length) return array;
	    
	        return array.filter(function(obj) {
	            return parts.every(function(part) {
	                return keys.some(function(key) {
	                    return String(obj[key]).toLowerCase().indexOf(part.toLowerCase()) > -1;
	                });
	            });
	        });
	    };
	})
	.directive('fileModel', ['$parse', function ($parse) {
	    return {
	       restrict: 'A',
	       link: function(scope, element, attrs) {
	    	   var onChangeHandler = scope.$eval(attrs.fileModel);

	    	      element.bind('change', function() {
	    	        scope.$apply(function() {
	    	          var files = element[0].files;
	    	          if (files) {
	    	            onChangeHandler(files);
	    	          }
	    	        });
	    	      });
	       }
	    };
	}]);
});