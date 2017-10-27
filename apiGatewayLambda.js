'use strict';

let requestProcessor = require('./app/requestProcessor.js');
let actionDecider = require('./app/actionDecider.js');
let directResponseAction = require('./app/directResponseAction.js');
let redirectResponseAction = require('./app/redirectResponseAction.js');

exports.handler = (event, context, callback) => {

    _doPreprocessing(context);

    console.log("[MAIN] Request processing.");
    requestProcessor.process(event)
    .then(function(requestParam){
        console.log("[MAIN] Action deciding.");
        return actionDecider.decide(requestParam);
    })
    .then(function(requestParam){
        console.log("[MAIN] Performing action "+requestParam['action']);
        if (requestParam['action'] === "RedirectResponseAction") {
            return redirectResponseAction.take(requestParam);
        } else if (requestParam['action'] === "DirectResponseAction") {
            return directResponseAction.take(requestParam);
        } else {
            console.log("[MAIN] [ERROR]Incorrect response type");
            callback(null, {statusCode: '500'});
        }
    })
    .then(function(requestParam){
        console.log("[MAIN] Sending BI event.");
        return biEventAction.take(requestParam);
    })
    .then(function(requestParam){
        console.log("[MAIN] Hitting callback and returning with code: "+requestParam['response'].statusCode);
        callback(null, requestParam['response']);
        return;
    })
    .catch(function(err){
        console.log("[MAIN] [ERROR] Handling error.");
        console.log("Error: ", err);
        callback(null, {statusCode: '500'});
    });
};

const _doPreprocessing = function(context) {
    // freeze the process soon after the callback is called, even if there are events in the event loop
    context.callbackWaitsForEmptyEventLoop = false;
};
