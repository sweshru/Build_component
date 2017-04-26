define(['buildapps','ui.bootstrap','bootstrap-tpls'], function (buildapps) { 

//MainCntrl
	buildapps.controller('EvenntRegPageCtrl',  function ( $rootScope, $scope, $http ,$filter, $timeout,$uibModal,GetEventService ) {
       
	    $scope.builddata = "created angular app";
		
	    GetEventService.Allevents().success(function(data, status){
		  	  
	    	$scope.datalist = data;
	    });
	    

	});



	
});
	