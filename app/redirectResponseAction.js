'use strict';

let contentMap = require('./content/contentMap.js');

let paramMap = contentMap.paramMap;
let urlRedirect = contentMap.uriRedirect;

let _takeAction = function(requestParam) {
	return new Promise(function(resolve, reject){
		console.log("[APP] Redirect response action called.");
		var location = urlRedirect['default'];
        if (urlRedirect[requestParam['key']]) {
            location = urlRedirect[requestParam['key']];
        }

        location = _manipulateUrl(location, requestParam['label'], requestParam['query']);

        requestParam['location'] = location;

        /*
	     * Generate HTTP redirect response using 302 status code. Location header
	     * is required in order to invoke browser redirect responses.
	     */
	    var response = {
	        statusCode: '302',
	        headers: {
	            Location: location,
	        },
	    };
	    requestParam['response'] = response;
	    resolve(requestParam);
	});
}

let _manipulateUrl = function(location, label, queryParams) {
    if (label && label != -1) {
        if (location.indexOf("?") !== -1) {
            location += "&label="+label;
        } else {
            location += "?label="+label;
        }
    }

    var startingStr = "&";
    for (var queryKey in queryParams) {
        if (location.indexOf("?") !== -1) {
            startingStr = "&";
        } else {
            startingStr = "?";
        }
        if (paramMap[queryKey]) {
            location += startingStr+""+paramMap[queryKey]+"="+queryParams[queryKey];
        } else {
            location += startingStr+""+queryKey+"="+queryParams[queryKey];
        }
    }
    return location;
}

module.exports = {
	take: _takeAction
}