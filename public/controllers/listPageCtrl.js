define(['buildapps','ui.bootstrap','bootstrap-tpls'], function (buildapps) { 

//MainCntrl
	buildapps.controller('listPageCtrl',  function ( $rootScope, $scope, $http ,$filter, $timeout,$uibModal ) {
       
	    $scope.builddata = "created angular app";
		
	    $scope.serchbar = function(){
	            $scope.whensearch = true;
	    };
	    $scope.goback = function(){
	        $scope.whensearch = false;
	    }
	    $scope.addcontact = function(){
	        var last_element = $scope.datalist[$scope.datalist.length - 1];
	        $scope.profiledetails.index = last_element['index'] + 1;
	        $scope.myModalcontact = $uibModal.open({
	            animation:true,
	            backdrop:false,
	            appendTo: angular.element( document.querySelector( '#attachduv' ) ),
	            size:'sm',
	            templateUrl:'templates/contact.html',
	            scope:$scope
	        });
	    }
	    $scope.cancel = function(){
	        $scope.myModalcontact.close();
	    }
		
	    $scope.addcontactdetails = function(){

	        $scope.myModalcontact.close();
	        console.log($scope.profiledetails);
	        $scope.profiledetails.name = $scope.profiledetails.fname +" "+$scope.profiledetails.sname;
	        delete $scope.profiledetails.fname;
	        delete $scope.profiledetails.sname;
	        $http.post('/profileupdate', $scope.profiledetails
	            ).success(function(data, status, headers, config) {
	                debugger;
	                alert("Success!");
	                $scope.datalist = data;
	            }).error(function(data, status, headers, config) {
	                alert("Error");
	            });

	    }
	    

	});



	
});
	