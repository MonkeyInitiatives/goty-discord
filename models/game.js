var orm = require("../config/orm.js");

var game = {
  all: function(cb) {
    orm.all("games", function(res) {
      cb(res);
    });
  },
  create: function(cols, vals, cb) {
    orm.create("games", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("games", objColVals, condition, function(res) {
      cb(res);
    });
  }
};

module.exports = game;
