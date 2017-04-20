var request = require("request");
var http = require('http');
var querystring = require('querystring');

var extServerOptions = {
    host: 'localhost',
    port: '8006',
    method: 'GET'
};
exports.getEvents = function(req,resp){
	console.log("############ROUTING in NOdejs");
	console.log(req.path);
	extServerOptions.path = req.path;
	var datas ;
   http.request(extServerOptions, function (res) {
        res.setEncoding('utf8');
		console.log("*******NODE CONNECT NDST form response***********");
		
        res.on('data', function (data) {
			console.log("*******NODE CONNECT NDST***********");
			var b = new Buffer(data);
			datas = JSON.parse(b.toString());
			console.log(datas);
			resp.send(datas);
           
        });
		
 
    }).end();
};
exports.updateEvents = function(req,resp){
	console.log("update data****************");
	console.log(req.body);
		
		var datasend;
		for(var i in req.body){
			datasend = i;
			  console.log("****************PARSED***************");
			  console.log(JSON.stringify(datasend));
			}
		
		var datap = querystring.stringify(datasend);
  var reqq =  http.request({
	   host: 'localhost',
	   port: '8006',
	   path : "/Exerciseproject/Testpackage",
       method : "POST",
       headers : { "Content-Type" : "application/x-www-form-urlencoded"},
       body:datap
   }, function (err,res,body) {
        res.setEncoding('utf8');
		console.log("*******NODE CONNECT NDST form response***********");
		
        res.on('data', function (data) {
			console.log("*******NODE CONNECT NDST***********");
			var b = new Buffer(data);
			datas = JSON.parse(b.toString());
			console.log(datas);
			resp.send(datas);
           
        });
        res.on('error', function (data) {
			console.log("*******NERROROO***********");
		
           
        });
		
		
 
    }).end();
	
};
exports.createEvents = function(req,resp){
		extServerOptions.path = req.path;
	var datas ;
   http.request(extServerOptions, function (res) {
        res.setEncoding('utf8');
		console.log("*******NODE CONNECT NDST form response***********");
		
        res.on('data', function (data) {
			console.log("*******NODE CONNECT NDST***********");
			var b = new Buffer(data);
			datas = JSON.parse(b.toString());
			console.log(datas);
			resp.send(datas);
           
        });
		
 
    }).end();
};
exports.deleteEvents = function(req,resp){
		extServerOptions.path = req.path;
	var datas ;
   http.request(extServerOptions, function (res) {
        res.setEncoding('utf8');
		console.log("*******NODE CONNECT NDST form response***********");
		
        res.on('data', function (data) {
			console.log("*******NODE CONNECT NDST***********");
			var b = new Buffer(data);
			datas = JSON.parse(b.toString());
			console.log(datas);
			resp.send(datas);
           
        });
		
 
    }).end();
};