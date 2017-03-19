var express = require("express");
var app = express();
var sherdog = require('./backend/getFighter.js');
var winston = require('winston');

console.log("Launching");

winston.configure({
    transports: [
        new (winston.transports.File)({ filename: 'app.log' })
    ]
})

var settings = {
    logOutputOnce: true,
    loggedResponses: 0,
    caching: false,
    storedResponses: {}, //keymap
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/Search', function (req, response) {
    response.contentType('application/json');
    var defaultResponse = {
        error: true
    };

    if (typeof req.query.name === 'undefined') {
        console.error(" Error. Try something like this instead: /Search?name=Fedor");
        response.send(defaultResponse);
        return;
    }
    console.log('API called with query:', req.query);
    if (settings.caching) {
        var cachedResponse = getStoredResponse(req.query);
        if (cachedResponse) {
            console.log("cached response");
            response.send(cachedResponse);
            return;
        }
    }

    var fighterName = decodeURIComponent(req.query.name);
    console.log("calling mma.fighter", fighterName);

    //sherdog.getFighter(fighterName).then(function (data) {
    sherdog.getFromEvent().then(function (data) {
        console.log("response:", data);
        if (settings.logOutputOnce && settings.loggedResponses <= 0) {
            winston.log('info', data);
            storeResponse(req.query, data);
            settings.loggedResponses++;
        }
        response.send(data);
        return;
    }).catch(function (reason) {
        console.error("fail");
        response.send("FAIL: " + reason);
        return;
    });

    console.log("sequential stuff done");
});

function storeResponse(key, value) {
    var contains = getStoredResponse(key);
    if (contains)
        return;
    console.log("storing", key);
    settings.storedResponses[key] = value;
}
function getStoredResponse(key) {
    return settings.storedResponses[key];
}

var port = 8081;
console.log('Server listening on:' + port);
app.listen(port);
console.info("Endpoint example: /Search?name=Fedor");
console.info("to launch the frontend goto /frontend and run 'npm start' ");