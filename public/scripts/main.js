require.config({
  paths: {
	  'angular': '../angular/angular',
	  'angular-route': '../angular-ui-router/release/angular-ui-router',
	  'd3':'../angular-nvd3/node_modules/d3/d3.min',
	  'nvd3':'../angular-nvd3/node_modules/nvd3/build/nv.d3',
	  'angularnvd3':'../angular-nvd3/dist/angular-nvd3',
	  'jquery': '../jquery/dist/jquery',
	  'bootstrap': '../bootstrap/dist/js/bootstrap',
	  'ui.bootstrap': '../angular-ui-bootstrap/dist/ui-bootstrap',
	  'bootstrap-tpls': '../angular-ui-bootstrap/dist/ui-bootstrap-tpls',
	  'homecontroller': '../controllers/homeCtrl',
	  'gridpagecontroller': '../controllers/gridpagectrl',
	  'multipagecontroller': '../controllers/multipageCtrl',
	  'listpagecontroller':'../controllers/listPageCtrl',
	  'dragdroppagecontroller':'../controllers/DragDropPageCtrl',
	  'tabspagecontroller':'../controllers/TabsPageCtrl',
	  'flippagecontroller':'../controllers/FlippablePageCtrl',
	  'calpagecontroller':'../controllers/CalPageCtrl',
	  'eventregpagecontroller':'../controllers/EvenntRegPageCtrl',
	  'chartpagecontroller':'../controllers/ChartPageCtrl',
	  'flipmultipagecontroller':'../controllers/FlipPageCtrl',
	  'services':'../services/eventservices',
	  'directives': '../directives/directives'
  },
  shim: {
	  angular: {
          exports: 'angular'
      } ,
      'angular-route': {
          deps: ['angular']
      },
      'bootstrap':{
    		deps:['jquery']  
      },
      'ui.bootstrap': {
          deps: ['angular']
      },
      'bootstrap-tpls': {
          deps: ['angular']
      },
      'nvd3':{deps:['d3']},
      'angularnvd3':{deps: ['angular', 'd3', 'nvd3']}

  }
});

require(['buildapps','homecontroller','gridpagecontroller','multipagecontroller','listpagecontroller','dragdroppagecontroller','tabspagecontroller','flippagecontroller','calpagecontroller','eventregpagecontroller','chartpagecontroller','flipmultipagecontroller','services','directives'], function (buildapps) {
	buildapps.init();
});