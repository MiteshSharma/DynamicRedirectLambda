'use strict';

const _decideAction = function(requestParam) {
	return new Promise(function(resolve, reject){
		console.log("[APP] Action decider called.");
		/*
	     * Existance of word facebookexternalhit or Twitterbot in User-Agent suggest existance of 
	     * bot for unfurling
	     */
	    var isBotForUnfurling = -1;
	    var userAgent = requestParam['header']['User-Agent'];
	    console.log("[DecideAction] UserAgent is : "+ userAgent);
	    if (userAgent) {
	        isBotForUnfurling = userAgent.search(/facebookexternalhit|Twitterbot|Slackbot/);
	        console.log("[DecideAction] UserAgent checking with value: "+isBotForUnfurling);
	    } else {
	    	console.log("[DecideAction] UserAgent not checked ");
	    }
	    if (isBotForUnfurling === -1) {
	    	requestParam['action'] = "RedirectResponseAction";
	    } else {
	    	requestParam['action'] = "DirectResponseAction";
	    }
	    resolve(requestParam);
	})
}

module.exports = {
	decide: _decideAction
}