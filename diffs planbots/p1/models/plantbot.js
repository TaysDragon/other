// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var plants = {
  all: function(cb) {
    orm.all("fruit_trees", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("fruit_trees", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("fruit_trees", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("fruit_trees", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (Controller.js).
module.exports = plants;
