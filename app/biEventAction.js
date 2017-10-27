'use strict';

let biEvent = require('./bi/biEvent.js');

const _takeAction = function(requestParam) {
	return new Promise(function(resolve, reject){
		console.log("[APP] BI event action called.");
		var biEventParam = {
			'event_name': "url_redirect",
	        'isRedirected': requestParam['location'] ? true : false,
	        'allHeaders' : requestParam['header'],
	        'locationUrl' : requestParam['location'],
	        'userAgent' : requestParam['header']?requestParam['header']['User-Agent'] : "",
	        'label': requestParam['label']
	    };
	    biEvent.sendBiEvent(biEventParam)
	    .then((response) => {
	      	console.log("Request response : "+response);
	    	resolve(requestParam);
	    	return;
		})
	  	.catch((err) => {
	  		console.error("Request error : "+ err);
	    	reject(err);
	    	return;
	  	});
	});
}

module.exports = {
	take: _takeAction
}