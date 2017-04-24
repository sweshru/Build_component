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
	
		var datasend = req.body;
		datasend = JSON.stringify(datasend);
		console.log(datasend);

		var datap = JSON.stringify(datasend);
		console.log(datasend);
  var reqq =  http.request({
	   host: 'localhost',
	   port: '8006',
	   path : req.path,
       method : req.method,
       headers : { 'Content-Type' : 'application/json'}
   }, function (res) {
        //res.setEncoding('utf8');
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
		
		
 
    });
  reqq.write(datasend);
  reqq.end();
	
};
exports.createEvents = function(req,resp){
		extServerOptions.path = req.path;
	var datas;
	var reqdata = req.body;
	reqdata = JSON.stringify(reqdata);
  var createreq =  http.request({
	   host: 'localhost',
	   port: '8006',
	   path : req.path,
       method : req.method,
       headers : { 'Content-Type' : 'application/json'}
   }, function (res) {
        res.setEncoding('utf8');
		console.log("*******NODE CONNECT NDST form response***********");
		
        res.on('data', function (data) {
			console.log("*******NODE CONNECT NDST***********");
			var b = new Buffer(data);
			datas = JSON.parse(b.toString());
			console.log(datas);
			resp.send(datas);
           
        });
		
 
    });
  createreq.write(reqdata);
  createreq.end();
};
exports.deleteEvents = function(req,resp){
		extServerOptions.path = req.path;
	var datas ;
	var deletereq = req.body;
	deletereq = JSON.stringify(deletereq);
  var deleterequest =  http.request({
	   host: 'localhost',
	   port: '8006',
	   path : req.path,
       method : req.method,
       headers : { 'Content-Type' : 'application/json'}
   }, function (res) {
        res.setEncoding('utf8');
		console.log("*******NODE CONNECT NDST form response***********");
		
        res.on('data', function (data) {
			console.log("*******NODE CONNECT NDST***********");
			var b = new Buffer(data);
			datas = JSON.parse(b.toString());
			console.log(datas);
			resp.send(datas);
           
        });
		
 
    });
  deleterequest.write(deletereq);
  deleterequest.end();
};