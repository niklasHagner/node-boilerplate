var express = require("express");
var app = express();
var getRequest = require('./getRequest.js');
var winston = require('winston');

console.log("Launching");

winston.configure({
    transports: [
        new (winston.transports.File)({ filename: 'app.log' })
    ]
})

var settings = {
    logOutputOnce: false,
    loggedResponses: 0,
    caching: true,
    storedResponses: {}, //keymap
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, response) {
    response.contentType('application/json');
    var defaultResponse = {
        error: true
    };
    if (typeof req.query.encodedUri === 'undefined') {
        console.error(" Error. Try something like this instead: localhost:someport/?encodedUri=https%3A%2F%2Fjsonplaceholder.typicode.com");
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
    var decoded = decodeURIComponent(req.query.encodedUri);

    getRequest.getFromUrl(decoded).then(function (data) {
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
console.info("Example call: localhost://" + port + "?/encodedUri=https%3A%2F%2Fjsonplaceholder.typicode.com");