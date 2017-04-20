/**
 * Created by sc452095 on 11/28/16.
 */
var buildapps = angular.module('buildapp',['ui.bootstrap','ui.router','nvd3']);


buildapps.controller('builappcontroller',function($scope,$http,$uibModal){
    console.log("data");
    $scope.whenshow = false;
    $scope.profiledetails={};
   $scope.fliptrue = false;
    $scope.flipback = false;
	$scope.datadd = false;
//$scope.showeditflag=false;
    $scope.builddata = "created angular app";
    $http.get("/Exerciseproject/Testpackage").
        then(function(response) {
			debugger;
            console.log(response);
            $scope.datalist = response.data;
        }, function(response) {
            alert("Error retrieving contacts.");
        });
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
      
			  $http({
        	method: 'POST',
        	url: 'http://localhost:8006/Exerciseproject/DeletePackage',
			dataType:'json',
			data:tmpdata,
        	headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        }).success(function (data) {

        	console.log(data);	
$scope.datalist =data;			
                
        }).error(function(data, status) {
         
      });

    }
	 $scope.updateedit = function(){
var tmpdata = JSON.stringify($scope.editdetails);
        $scope.myModalevent.close();
        console.log($scope.editdetails);
		debugger;
      
			  $http({
        	method: 'POST',
        	url: '/Exerciseproject/Testpackage',
			dataType:'json',
			data:$scope.editdetails,
        	headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        }).success(function (data) {
			debugger;
$scope.datalist =data;
        	console.log(data);		  
                
        }).error(function(data, status) {
         
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
		$http({
        	method: 'POST',
        	url: 'http://localhost:8006/Exerciseproject/CreatePackage',
			dataType:'json',
			data:tmpdata,
        	headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        }).success(function (data) {

        	console.log(data)	;
$scope.datalist =data;			
                
        }).error(function(data, status) {
         
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
    $scope.flipthediv = function(){
        $scope.flipclass = "flipped";
    }
    $scope.flipbackside =  function(){
        $scope.flipclass = "flippedback";

    }
$scope.tabindex = 0;
$scope.elementactive = true;
    this.gettabindex = function(){

        return ++$scope.tabindex;
    }
    $scope.openhiddendiv = function(){
        if($scope.whenshow){
            $scope.whenshow = false;
        }
        else{
            $scope.whenshow = true;
        }

    };


    $scope.dropped = [];

    // array of items for dragging
    $scope.items = [
        {id: 'pieChart', name: "Pie",clname:"pie-chart"},
        {id: 'lineChart', name: "Line",clname:"line-chart" },
        {id: 'historicalBarChart', name: "Column",clname:"area-chart" },
        {id: 'multiBarHorizontalChart', name: "Donut",clname:"bar-chart-o" },
        {id: 'pieChart', name: "Scatter",clname:"pie-chart"},
        {id: 'lineChart', name: "Discrete Bar",clname:"line-chart" },
        {id: 'historicalBarChart', name: "MultiBar",clname:"area-chart" },
        {id: 'multiBarHorizontalChart', name: "BoxPlot",clname:"bar-chart-o" },
        {id: 'pieChart', name: "sunburst",clname:"pie-chart"},
        {id: 'lineChart', name: "MultiChart",clname:"line-chart" },
        {id: 'historicalBarChart', name: "Bullet",clname:"area-chart" }
    ];

    $scope.moveToBox = function(id) {
        console.log(id);
        if(id=='pieChart'){
            $scope.options = {
                chart: {
                    type: 'pieChart',
                    height: 300,
                    x: function(d){return d.key;},
                    y: function(d){return d.y;},
                    showLabels: true,
                    duration: 500,
                    labelThreshold: 0.01,
                    labelSunbeamLayout: true,
                    legend: {
                        margin: {
                            top: 5,
                            right: 35,
                            bottom: 5,
                            left: 0
                        }
                    }
                }
            };

            $scope.data = [
                {
                    key: "One",
                    y: 5
                },
                {
                    key: "Two",
                    y: 2
                },
                {
                    key: "Three",
                    y: 9
                },
                {
                    key: "Four",
                    y: 7
                },
                {
                    key: "Five",
                    y: 4
                },
                {
                    key: "Six",
                    y: 3
                },
                {
                    key: "Seven",
                    y: .5
                }
            ];
        }
        else if(id=='historicalBarChart'){
            $scope.options = {
                chart: {
                    type: 'historicalBarChart',
                    height: 300,
                    margin : {
                        top: 20,
                        right: 20,
                        bottom: 65,
                        left: 50
                    },
                    x: function(d){return d[0];},
                    y: function(d){return d[1]/100000;},
                    showValues: true,
                    valueFormat: function(d){
                        return d3.format(',.1f')(d);
                    },
                    duration: 100,
                    xAxis: {
                        axisLabel: 'X Axis',
                        tickFormat: function(d) {
                            return d3.time.format('%x')(new Date(d))
                        },
                        rotateLabels: 30,
                        showMaxMin: false
                    },
                    yAxis: {
                        axisLabel: 'Y Axis',
                        axisLabelDistance: -10,
                        tickFormat: function(d){
                            return d3.format(',.1f')(d);
                        }
                    },
                    tooltip: {
                        keyFormatter: function(d) {
                            return d3.time.format('%x')(new Date(d));
                        }
                    },
                    zoom: {
                        enabled: true,
                        scaleExtent: [1, 10],
                        useFixedDomain: false,
                        useNiceScale: false,
                        horizontalOff: false,
                        verticalOff: true,
                        unzoomEventType: 'dblclick.zoom'
                    }
                }
            };

            $scope.data = [
                {
                    "key" : "Quantity" ,
                    "bar": true,
                    "values" : [ [ 1136005200000 , 1271000.0] , [ 1138683600000 , 1271000.0] , [ 1141102800000 , 1271000.0] , [ 1143781200000 , 0] , [ 1146369600000 , 0] , [ 1149048000000 , 0] , [ 1151640000000 , 0] , [ 1154318400000 , 0] , [ 1156996800000 , 0] , [ 1159588800000 , 3899486.0] , [ 1162270800000 , 3899486.0] , [ 1164862800000 , 3899486.0] , [ 1167541200000 , 3564700.0] , [ 1170219600000 , 3564700.0] , [ 1172638800000 , 3564700.0] , [ 1175313600000 , 2648493.0] , [ 1177905600000 , 2648493.0] , [ 1180584000000 , 2648493.0] , [ 1183176000000 , 2522993.0] , [ 1185854400000 , 2522993.0] , [ 1188532800000 , 2522993.0] , [ 1191124800000 , 2906501.0] , [ 1193803200000 , 2906501.0] , [ 1196398800000 , 2906501.0] , [ 1199077200000 , 2206761.0] , [ 1201755600000 , 2206761.0] , [ 1204261200000 , 2206761.0] , [ 1206936000000 , 2287726.0] , [ 1209528000000 , 2287726.0] , [ 1212206400000 , 2287726.0] , [ 1214798400000 , 2732646.0] , [ 1217476800000 , 2732646.0] , [ 1220155200000 , 2732646.0] , [ 1222747200000 , 2599196.0] , [ 1225425600000 , 2599196.0] , [ 1228021200000 , 2599196.0] , [ 1230699600000 , 1924387.0] , [ 1233378000000 , 1924387.0] , [ 1235797200000 , 1924387.0] , [ 1238472000000 , 1756311.0] , [ 1241064000000 , 1756311.0] , [ 1243742400000 , 1756311.0] , [ 1246334400000 , 1743470.0] , [ 1249012800000 , 1743470.0] , [ 1251691200000 , 1743470.0] , [ 1254283200000 , 1519010.0] , [ 1256961600000 , 1519010.0] , [ 1259557200000 , 1519010.0] , [ 1262235600000 , 1591444.0] , [ 1264914000000 , 1591444.0] , [ 1267333200000 , 1591444.0] , [ 1270008000000 , 1543784.0] , [ 1272600000000 , 1543784.0] , [ 1275278400000 , 1543784.0] , [ 1277870400000 , 1309915.0] , [ 1280548800000 , 1309915.0] , [ 1283227200000 , 1309915.0] , [ 1285819200000 , 1331875.0] , [ 1288497600000 , 1331875.0] , [ 1291093200000 , 1331875.0] , [ 1293771600000 , 1331875.0] , [ 1296450000000 , 1154695.0] , [ 1298869200000 , 1154695.0] , [ 1301544000000 , 1194025.0] , [ 1304136000000 , 1194025.0] , [ 1306814400000 , 1194025.0] , [ 1309406400000 , 1194025.0] , [ 1312084800000 , 1194025.0] , [ 1314763200000 , 1244525.0] , [ 1317355200000 , 475000.0] , [ 1320033600000 , 475000.0] , [ 1322629200000 , 475000.0] , [ 1325307600000 , 690033.0] , [ 1327986000000 , 690033.0] , [ 1330491600000 , 690033.0] , [ 1333166400000 , 514733.0] , [ 1335758400000 , 514733.0]]
                }];
        }

        $scope.$apply();
    };

    $scope.showItmesLeft = function () {
        alert($scope.items.length + " items left.");
    };

    $scope.showItmesDropped = function () {
        alert($scope.dropped.length + " items in drop-box.");
    };
});

buildapps.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/home');
    $stateProvider

        .state('/',{
            url:'/home',
            templateUrl:'templates/homepage.html'
        })
        .state('grid',{
            url:'/grid',
            templateUrl:'templates/gridpage.html'
        })
		.state('eventreg',{
			url:'/eventreg',
			templateUrl:'templates/eventregpage.html'
			
		})
        .state('multi',{
            url:'/multi',
            views: {

                // the main template will be placed here (relatively named)
                '': { templateUrl: 'templates/multipage.html' },

                //  the child views (absolutely named)

                // for column #1, defines a separate controller
                'list@multi': {
                    templateUrl: 'templates/list.html'
                },

                // the child views (absolutely named)
                'chart@multi': {
                    templateUrl: 'templates/chart.html'
                },

                // for bottom row, defines a separate controller shares with column #1
                'flip@multi': {
                    templateUrl: 'templates/flip.html'
                }
            }
        })
        .state('dragdrop',{
            url:'/dragdrop',
            templateUrl:'templates/dragdrop.html'
        })
        .state('tabs',{
            url:'/tabs',
            templateUrl:'templates/tabs.html'
        })
        .state('flipdiv',{
            url:'/flipdiv',
            templateUrl:'templates/flippable.html'
        })
        .state('caldiv',{
            url:'/caldiv',
            templateUrl:'templates/calendarpage.html'
        })
});
buildapps.directive('myDataGrid',function(){
    return{
        restrict: 'E',
        scope:{
            info:'=info'
        },
        templateUrl : 'directives/grid.html',
        link:function(scope,element){
            element.css('width','400px');
            element.css('overflow-x','scroll');
            console.log(scope.info);
            scope.currentpage = 0;
            scope.pagesize = 5;
            scope.numberOfpages=function(){
                return Math.ceil(scope.info.length/scope.pagesize);
            }
            scope.colval =[];
            for(var l=0;l<1;l++){
                var temparray = scope.info[l];
                for(key in temparray){
                    scope.colval.push(key);
                }
            }
            console.log(scope.colval);
        }
    }
});


buildapps.filter('startFrom', function() {
    return function(input, start) {
        if (!angular.isArray(input)) {
            return [];
        }
        start = +start; //parse to int
        return input.slice(start);
    }
});

buildapps.filter('opportunitiesFilter',function(){
    return function(array, input){
        if (!angular.isArray(input)) {
            return [];
        }
        var match = [];                // will hold your newly filtered data
        if (input = '') return array;  // return orig data if nothing entered

        // use foreach to loop through your original array
        angular.forEach(array, function(item){

            // your filter logic goes here - might be the following:
            if (item.indexOf(input) >= 0) match.push(item);
        });
        return match;
    }
});
buildapps.directive('ddDraggable',function(){
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
});
buildapps.directive('ddDropTarget',function(){
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
});
buildapps.directive('customTabs',function(){
    return {
        scope:true,
        restrict: 'A',
        controller:'builappcontroller'
    };
});
buildapps.directive('tabHead',function(){
    return {
        restrict: 'A',
        link: function(scope, el, attrs){
            el.bind('click',function(){
               var activeelement =  $("#makeclassactive li.active");
                var bodyactiveelement = $("#tabbodyactive div.show");
                activeelement.removeClass('active');
                bodyactiveelement.removeClass('show');
                el.addClass('active');
                var eleentid = el[0].id;
                $("div#"+eleentid).addClass('show');
                $("div#"+eleentid).addClass('animateslide');
            });
         ;
        }
    };
});
buildapps.directive('tabBody',function(){
    return {
        restrict: 'A',
        link: function(scope, el, attrs){

        }
    };
});
buildapps.directive('myCalendar',function(){
    return{
        restrict: 'E',
        templateUrl : 'directives/calendar.html',
        link:function(scope,element){

    }
    }
});
