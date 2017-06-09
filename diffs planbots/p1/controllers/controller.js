// This file uses Sequelize to manage data manipulation
// for all apropos http requests.

//Dependencies
var express = require("express");

var router = express.Router();

// Import the model (plants.js) to use its database functions.
var db = require("../models");

// get route -> index
router.get("/", function(req, res) {
  // send us to the next get function instead.
  res.redirect("/search");
});

// get route, edited to match sequeliz
erouter.get("/plants", function(req, res) {
  // replace old function with sequelize function
  db.fruit_trees.findAll({
    // Here we specify we want to return our plants by ascending botanical_name
    order: [
      ["botanical_name", "ASC"]
    ]
  })
  // use promise method to pass the plants...
  .then(function(dbBurger) {
    // into the main index, updating the page
    var hbsObject = {
      burger: dbBurger
    };
    return res.render("index", hbsObject);
  });
});

// post route to create burgers
router.post("/burgers/create", function(req, res) {
  // edited burger create to add in a burger_name
  db.fruit_trees.create({
    burger_name: req.body.burger_name
  })
  // pass the result of our call
  .then(function(dbBurger) {
    // log the result to our terminal/bash window
    console.log(dbBurger);
    // redirect
    res.redirect("/");
  });
});

// put route to devour a burger
router.put("/burgers/update", function(req, res) {
  // If we are given a customer, create the customer and give them this devoured burger
  if (req.body.customer) {
    db.Customer.create({
      customer: req.body.customer,
      BurgerId: req.body.burger_id
    })
    .then(function(dbCustomer) {
      return db.Burger.update({
        devoured: true
      }, {
        where: {
          id: req.body.burger_id
        }
      });
    })
    .then(function(dbBurger) {
      res.redirect("/");
    });
  }
  // If we aren't given a customer, just update the burger to be devoured
  else {
    db.Burger.update({
      devoured: true
    }, {
      where: {
        id: req.body.burger_id
      }
    })
    .then(function(dbBurger) {
      res.redirect("/");
    });
  }
});

module.exports = router;