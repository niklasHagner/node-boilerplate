import $ from 'jquery';


var getFeeds = function (reactRoot, name) {
    // var urls = getListOfUrls();
    // var promiseArr = [];
    // urls.forEach((x, index) => {
    //     var promise = getSingleFeed(x.url, x.color);
    //     promiseArr.push(promise);
    // });
    // Promise.all(promiseArr).then((values) => {
    //     var reactResult = { articles: values };
    //     reactRoot.setState(reactResult);
    // }).catch(function (e) {
    //     console.error(e);
    // });
    var reactResult = {
        articles: []
    };
    $.get(`http://localhost:8081/Search?name=${name}`, (result) => {
        if (result.error) {
            console.error("Feed error");
            return;
        }
        reactResult.articles.push(result);

        var promises = result.fightHistory.map((fight) => {
            return getOne(fight.opponentName);
        });

        Promise.all(promises).then(values => {
            values.forEach((x) => {
                if (reactResult.articles.indexOf(x) < 0)
                    reactResult.articles.push(x);
                reactRoot.setState(reactResult);
            });
        });

    });
};

function getOne(name) {
    var name = encodeURIComponent(name);
    return new Promise(function (fulfill, reject) {
        $.get(`http://localhost:8081/Search?name=${name}`, (result) => {
            if (result.error) {
                console.error("Feed error");
                reject(result.error);
            }
            fulfill(result);
        });
    });
}

var getTestData = function () {
    return {
        articles: [
            {
                name: 'Fighter X',
                age: '30',
                weight_kg: '70',
                height_cm: '180',
                association: 'Alpha',
            }
        ]
    }
};

export { getFeeds, getTestData };