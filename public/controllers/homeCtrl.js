define(['buildapps','ui.bootstrap','bootstrap-tpls'], function (buildapps) { 

//MainCntrl
	buildapps.controller('HomePageCtrl',  function ( $rootScope, $scope, $http ,$filter, $timeout,$uibModal,GetEventService ) {

		console.log("data");
		$scope.datadd = false;
		$scope.currentpage =0;
		$scope.pagesize = 6;
	//$scope.showeditflag=false;
	    $scope.builddata = "created angular app";
	    GetEventService.Allevents().success(function(data, status){
	  	  
	    	$scope.datalist = data;
	    });
	    
	    $scope.numberOfpages = function(){
 	    	return Math.ceil($scope.datalist.length/$scope.pagesize);
 	    }
			$scope.showedit = function(index){
				$scope.showeditflag=index;
				
	       
			}
			$scope.showeditmodal = function(rowdata,index){
				$scope.editdetails={};
				$scope.editdetails.eventname = rowdata.EventName;
				$scope.editdetails.descp = rowdata.Description;
				$scope.editdetails.idevent = rowdata.IdEvent;
				$scope.editdetails.cntry = rowdata.Country;
				
				$scope.myModalevent = $uibModal.open({
	            animation:true,
	            backdrop:false,
	            appendTo: angular.element( document.querySelector( '#tablediv' ) ),
	            size:'lg',
	            templateUrl:'templates/eventedit.html',
	            scope:$scope
				 });
			}
			$scope.showdeletemodal = function(rowdata,index){
				$scope.deletedata = rowdata;
				$scope.deletetext = "Are you sure to delete event '"+"'"+rowdata.EventName;
				$scope.myModaldeleteevent = $uibModal.open({
	            animation:true,
	            backdrop:false,
	            appendTo: angular.element( document.querySelector( '#tablediv' ) ),
	            size:'lg',
	            templateUrl:'templates/eventdelete.html',
	            scope:$scope
				 });
			}
	
		$scope.canceledit =function(){
			$scope.editdetails={};
	        $scope.myModalevent.close();
		}
		$scope.canceldelete = function(){
	        $scope.myModaldeleteevent.close();
		}
		$scope.deleteevent = function(){
	var tmpdata = JSON.stringify($scope.deletedata);
	        $scope.myModaldeleteevent.close();
	      
	        GetEventService.Deleteevents(tmpdata).success(function(data, status){
			  	  
		    	$scope.datalist = data;
		    });

	    }
		 $scope.updateedit = function(){
	var tmpdata = JSON.stringify($scope.editdetails);
	        $scope.myModalevent.close();
	        console.log($scope.editdetails);
			debugger;
	      
			 GetEventService.Editevents(tmpdata).success(function(data, status){
			  	  
			    	$scope.datalist = data;
			    });

	    }
		$scope.saveobjectglobal={};
		$scope.savearray=[];
		$scope.addEvent = function(){
			$scope.savearray=[];
			$scope.saveobjectglobal.idEvent =Math.floor((Math.random() * 100000) + 1);
			$scope.dataadd = true;
		}
		
		
		$scope.saveevent = function(){
			$scope.dataadd = false;
			
			//$scope.savearray.push($scope.saveobjectglobal);
			console.log($scope.saveobjectglobal);
			
			var tmpdata = JSON.stringify($scope.saveobjectglobal);
			$scope.saveobjectglobal={};
			console.log($scope.saveobjectglobal);
			 GetEventService.Createevents(tmpdata).success(function(data, status){
			  	  
			    	$scope.datalist = data;
			    });
		};


		$scope.onFilesSelected = function(files) {
		    console.log("files - " + files);
		    $scope.myFile = files[0];
		    console.log($scope.myFile);
		};
	

	});
});
	