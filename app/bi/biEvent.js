'use strict';

//var aws = require('aws-sdk');
var request = require('./../server/serverRequest.js');
const config = require('./../../config.json');

const _getBiServerUrl = function() {
	var biServerUrl = config.biServer;
	if (process.env.BI_SERVER_URL) {
		biServerUrl = process.env.BI_SERVER_URL;
	}
	return biServerUrl;
}

const _postBiEvent = function(params) {
  	var biEventUrl = _getBiServerUrl();

    console.log("Making BI server call to api : "+ biEventUrl);
    return request.makeCall(biEventUrl, "POST", params)
};

var _sendBiEvent = function(params, callback) {
	// Making BI call to our internal server
	return _postBiEvent(params);
};

module.exports = {
	sendBiEvent: _sendBiEvent
}