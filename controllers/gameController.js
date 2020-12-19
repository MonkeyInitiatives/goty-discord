var express = require("express");

var router = express.Router();
var connection = require("../config/connection.js");
var game = require("../models/game.js");
var user = require("../models/user.js");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

router.get("/", function (req, res) {
  game.all(function (data) {
    var hbsObject = {
      games: data
    };
    hbsObject.games = shuffle(hbsObject.games)
    // console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.get("/winners", function (req, res) {
  var now = new Date();
  var fullDaysSinceEpoch = Math.floor(now / 8.64e7);
  console.log(fullDaysSinceEpoch)
  if (fullDaysSinceEpoch > 18615) {
  connection.query("SELECT * from games ORDER BY votes DESC", function (err, result) {
    if (err) {
      throw err;
    }
    var hbsObject = {
      games: result
    };
    let request = xhr;
    request.open("GET", "https://4ozc0qiiec.execute-api.us-east-1.amazonaws.com/prod/quote");
    request.send();
    let GOTYQuote = ""
    request.onload = () => {
      if (request.status === 200) {
        GOTYQuote = JSON.parse(request.responseText).quote;
        hbsObject.quote = GOTYQuote;
        // console.log(hbsObject);
        res.render("results", hbsObject);
      }
      else {
        console.log("error");
      }
    }

  });
  }
  else {
    return res.status(404).end();
  }
});

router.put("/api/games/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  game.update(
    {
      votes: parseInt(req.body.votes)
    },
    condition,
    function (result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});
router.put("/api/users/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);
  connection.query("REPLACE INTO users SET userVotes=?, id = ?, userHash = ?", [req.body.userVotes, req.params.id, req.params.id], function (err, result) {
    if (err) {
      throw err;
    }
    res.status(200).end();
  });
  // user.update(
  //   {
  //     userVotes: parseInt(req.body.userVotes)
  //   },
  //   condition,
  //   function (result) {
  //     if (result.changedRows === 0) {
  //       // If no rows were changed, then the ID must not exist, so 404
  //       return res.status(404).end();
  //     }
  //     res.status(200).end();

  //   }
  // );
});

// Export routes for server.js to use.
module.exports = router;
