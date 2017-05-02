var request = require('request');

function getFromUrl(url) {
    return new Promise(function (fulfill, reject) {
        request(url, function (error, response, html) {

            if (error) {
                reject(error);
            }
            console.log("response", response);
            fulfill(response.body);
        })
    })
}

function getPlaceholderJson() {
    /*
        simple test with placeholder json. doesn't require any arguments
    */
    var url = 'https://jsonplaceholder.typicode.com';
    return new Promise(function (fulfill, reject) {
        request(url, function (error, response, html) {

            if (error) {
                reject(error);
            }
            console.log("response", response);
            fulfill(response.body);
        })
    })
}

module.exports = { getFromUrl: getFromUrl, test: getPlaceholderJson };