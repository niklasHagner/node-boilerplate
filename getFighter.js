var googleSearch = require('./google.js');
var sherdog = require('./ufc-scraper-lib.js');

function getFighter(name) {
  var options = {
    query: 'www.sherdog.com ' + name,
    limit: 1
  };

  return new Promise(function (fulfill, reject) {
    var urls = [];
    var promises = [];
    googleSearch.search(options, function (err, url) {
      // This is called for each result
      if (err)
        reject("rejected", err);
      if (url.indexOf("www.sherdog.com/fighter/") > -1) {
        urls.push(url);
        console.log(url);
        var fighterData = generateFighterData(url);
        promises.push(fighterData);

        fighterData.then(() => {
          fulfill(fighterData);
        }).catch((err) => {
          reject("getfighter promise error : " + err);
        });

      }
      else {
        reject("damn, no sherdog google hits");
      }
    });
  });
}

function generateFighterData(sherdog_url) {
  var fighter = {
    name: "",
    nickname: "",
    fullname: "",
    record: "",
    association: "",
    age: "",
    birthday: "",
    hometown: "",
    nationality: "",
    location: "",
    height: "",
    height_cm: "",
    weight: "",
    weight_kg: "",
    weight_class: "",
    college: "",
    degree: "",
    summary: [],
    wins: {
      total: 0,
      knockouts: 0,
      submissions: 0,
      decisions: 0,
      others: 0
    },
    losses: {
      total: 0,
      knockouts: 0,
      submissions: 0,
      decisions: 0,
      others: 0
    },
    strikes: {
      attempted: 0,
      successful: 0,
      standing: 0,
      clinch: 0,
      ground: 0
    },
    takedowns: {
      attempted: 0,
      successful: 0,
      submissions: 0,
      passes: 0,
      sweeps: 0
    },
    fights: []
  };

  //------------------------------------------+
  //  Crawl and Parse Sherdog Profile
  //  https://github.com/valish/sherdog-api
  //------------------------------------------+
  return new Promise(function (fulfill, reject) {
    sherdog.getFighter(sherdog_url, function (data) {
      console.log("getF", data);
      fulfill(data);

      //unnecessary shit
      fighter.name = data.name;
      fighter.nickname = data.nickname;
      fighter.association = data.association;
      fighter.age = data.age;
      fighter.birthday = data.birthday;
      fighter.hometown = data.locality;
      fighter.nationality = data.nationality;
      fighter.height = data.height;
      fighter.weight = data.weight;
      fighter.weight_class = data.weight_class;
      fighter.wins = data.wins;
      fighter.losses = data.losses;
      fighter.fights = data.fights;

      // Search for UFC profile
      // google(query + ' ufc', function (err, next, links) {
      //   if (err) console.error(err);

      //   for (var i = 0; i < links.length; ++i) {
      //     if (resultContains(links[i], "ufc.com/fighter/")) {
      //       ufc_url = links[i].href;
      //       i = 10;
      //     }
      //   }

      //   //------------------------------------------+
      //   //  Crawl and Parse UFC Profile
      //   //  https://github.com/valish/ufc-api
      //   //------------------------------------------+
      //   if (ufc_url) {
      //     ufc.getFighter(ufc_url, function (data) {
      //       fighter.fullname = data.fullname;
      //       fighter.hometown = data.hometown;
      //       fighter.location = data.location;
      //       fighter.height = data.height;
      //       fighter.height_cm = data.height_cm;
      //       fighter.weight = data.weight;
      //       fighter.weight_kg = data.weight_kg;
      //       fighter.record = data.record;
      //       fighter.college = data.college;
      //       fighter.degree = data.degree;
      //       fighter.summary = data.summary;
      //       fighter.strikes = data.strikes;
      //       fighter.takedowns = data.takedowns;

      //       callback(fighter);
      //     });
      //   } else {
      //     callback(fighter);
      //   }
      // });

    });
  });
}

module.exports.getFighter = getFighter;