var express = require('express');
var router = express.Router();
var db = require('../model/index.js');

db.init();


/* GET home page. */



router.post('/plus', function(req, res) {
  console.log(req.body);
  db.plus.create({
    title: req.body.name,
    date: new Date().getTime()
  }).then(data => {
    res.jsonp({
      error: null,
      data: data
    });
  });
});

router.get('/plus', function(req, res, next) {
  console.log(req.body);
  db.plus.readAllEntries().then(data => {
    if (!data.length) {
      var initDate = {
        title: 'Влад Гареев', 
        date: new Date().getTime()
      };
      db.plus.create(initDate).then(data => {
        res.jsonp({
          data: data,
        });
      });
    } else {
      console.log(data);
      res.jsonp({
        data: data[data.length-1]
      });
    }
  });
});

module.exports = router;
