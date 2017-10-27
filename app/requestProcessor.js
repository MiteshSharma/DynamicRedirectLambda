'use strict';

const _processRequest = function(event) {
	return new Promise(function(resolve, reject){
		console.log("[APP] Request processor called.");
		var requestParam = {};
		if (!event.path) {
			reject(requestParam);
			return;
		}
		var requestUris = event.path.split('\/');
	    
	    console.log("Request uri is " + requestUris);
	    requestParam['key'] = '';
	    if (requestUris.length > 1) {
	        requestParam['key'] = requestUris[1];
	    }
	    requestParam['label'] = -1;
	    if (requestUris.length > 2) {
	        requestParam['label'] = requestUris[2];
	    }
	    requestParam['query'] = event.queryStringParameters;
	    requestParam['header'] = event.headers;
	    resolve(requestParam);
	})
}

module.exports = {
	process: _processRequest
}