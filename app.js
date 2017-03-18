var express = require("express");
var app = express();
var sherdog = require('./getFighter.js');

console.log("Launching");

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/Search', function (req, response) {
    console.log('API called with query:');
    console.log(req.query);

    response.contentType('application/json');
    var defaultResponse = {
        error: true
    };
    if (typeof req.query.name === 'undefined') {
        console.error(" Error. Try something like this instead: /Search?name=Fedor");
        response.send(defaultResponse);
        return;
    }

    var fighterName = decodeURIComponent(req.query.name);
    console.log("calling mma.fighter", fighterName);

    sherdog.getFighter(fighterName).then(function (data) {
        console.log("response:", data);
        response.send(data);
    }).catch(function (reason) {
        console.error("fail");
        response.send("FAIL: " + reason);
    });

    console.log("sequential stuff done");
});


var port = 8081;
console.log('Server listening on:' + port);
app.listen(port);
console.info("Endpoint example: /Search?name=Fedor");