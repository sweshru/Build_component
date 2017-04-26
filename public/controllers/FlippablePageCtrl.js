define(['buildapps','ui.bootstrap','bootstrap-tpls'], function (buildapps) { 

//MainCntrl
	buildapps.controller('FlippablePageCtrl',  function ( $rootScope, $scope, $http ,$filter, $timeout,$uibModal ) {


       
	    $scope.builddata = "created angular app";
	    $scope.fliptrue = false;
	    $scope.flipback = false;
	    $scope.flipthediv = function(){
	        $scope.flipclass = "flipped";
	    }
	    $scope.flipbackside =  function(){
	        $scope.flipclass = "flippedback";

	    }
			
	   
	    

	});



	
});
	