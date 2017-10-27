'use strict';

var url = require('url');

const _makeCall = function(callUrl, httpMethod, data) {
  // return new pending promise
  return new Promise((resolve, reject) => {

  		const requestHandler = callUrl.startsWith('https') ? require('https') : require('http');
	    var urlData = url.parse(callUrl);

	    if (!urlData || !urlData.hostname || !httpMethod) {
	    	console.log("Skipping this step and returning success");
	        resolve("Done");
	        return;
	    }

	    console.log("Url host: "+ urlData.hostname+" with path: "+ urlData.pathname+" with method: "+httpMethod);

	    var postData = JSON.stringify(data);
	    var options = {
		  hostname: urlData.hostname,
		  port: callUrl.startsWith('https') ? 443 : 80,
		  path: urlData.pathname,
		  method: httpMethod,
		  headers: {
		      'Content-Type': 'application/json',
		  }
		};

	    var reqPost = requestHandler.request(options, function(res) {
	        console.log("Response statusCode: ", res.statusCode);
	        res.on('error', function(e) {
	        	console.log("Resolving to failure");
	            reject(e);
	        });

	        res.on('data', function (chunk) {
	        	console.log('Response: ' + chunk);
	      	});

	        res.on('end', function() {
	        	console.log("Resolving to success");
	            resolve("Done");
	        });
	    });

	    reqPost.write(postData);
	    reqPost.end();
    });
};

module.exports = {
	makeCall: _makeCall
}