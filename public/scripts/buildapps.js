/**
 * Created by sc452095 on 11/28/16.
 */
define(['angular','angular-route','bootstrap','ui.bootstrap','bootstrap-tpls','d3','nvd3','angularnvd3'], function (angular) {
	var buildapps = angular.module('buildapp',['ui.bootstrap','ui.router','nvd3']);
	buildapps.init = function () {



buildapps.controller('builappcontroller',function($scope,$http,$uibModal){
    console.log("data");
   
    $scope.profiledetails={};
   
//$scope.showeditflag=false;
    $scope.builddata = "created angular app";
   
	
	

    
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



});

buildapps.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/home');
    $stateProvider

        .state('/',{
            url:'/home',
            templateUrl:'templates/homepage.html',
            controller:'HomePageCtrl'
        })
        .state('grid',{
            url:'/grid',
            templateUrl:'templates/gridpage.html',
            controller:'GridPageCtrl'
        })
		.state('eventreg',{
			url:'/eventreg',
			templateUrl:'templates/eventregpage.html',
			controller:'EvenntRegPageCtrl'
		})
        .state('multi',{
            url:'/multi',
            views: {

                // the main template will be placed here (relatively named)
                '': { templateUrl: 'templates/multipage.html' ,
                	controller:'multiPageCtrl'},

                //  the child views (absolutely named)

                // for column #1, defines a separate controller
                'list@multi': {
                    templateUrl: 'templates/list.html',
                    controller:'listPageCtrl'
                },

                // the child views (absolutely named)
                'chart@multi': {
                    templateUrl: 'templates/chart.html',
                    controller:'ChartPageCtrl'
                },

                // for bottom row, defines a separate controller shares with column #1
                'flip@multi': {
                    templateUrl: 'templates/flip.html',
                    controller:'FlipPageCtrl'
                }
            }
        })
        .state('dragdrop',{
            url:'/dragdrop',
            templateUrl:'templates/dragdrop.html',
            controller:'DragDropPageCtrl'
        })
        .state('tabs',{
            url:'/tabs',
            templateUrl:'templates/tabs.html',
            controller:'TabsPageCtrl'
        })
        .state('flipdiv',{
            url:'/flipdiv',
            templateUrl:'templates/flippable.html',
            controller:'FlippablePageCtrl'
        })
        .state('caldiv',{
            url:'/caldiv',
            templateUrl:'templates/calendarpage.html',
            controller:'CalPageCtrl'
        })
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
angular.bootstrap(document, ['buildapp']);
    };
    return buildapps;
});
