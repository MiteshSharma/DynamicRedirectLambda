'use strict';

let contentMap = require('./content/contentMap.js');

let uriContent = contentMap.uriContent;

let _takeAction = function(requestParam) {
	return new Promise(function(resolve, reject){
		console.log("[APP] Direct response action called.");
	    var content = uriContent['default'];
	    if (uriContent[requestParam['key']]) {
	        content = uriContent[requestParam['key']];
	    }
	    /*
	     * Generate HTTP response using 200 status code with static content.
	     */
	    var response = {
	        statusCode: '200',
	        headers: {
	          'Cache-Control': 'max-age=100',
	          'Content-Type': 'text/html',
	          'Content-Encoding': 'UTF-8'
	        },
	        body: content,
	    };
	    requestParam['response'] = response;
	    resolve(requestParam);
	});
}

module.exports = {
	take: _takeAction
}