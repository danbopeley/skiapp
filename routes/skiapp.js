var config = require('../default.config');
var request = require('request');
var async = require('async');

module.exports = {
  render: function(req, res) {
    var loc = req.body;

    async.parallel([
        function(callback) {
         // var path = config.feed+'/'+config.resort +'/'+ config.history + '/' + config.format;
          var path = 'http://ski.bluetent.com/snocountry-hub/get-report/303003/4/json';
          request(path, function(err, res, body) {
            if(err) {console.log(err); callback(true); return;}
            obj = JSON.parse(body);
            callback(false, obj);
          });
        },
      ],

      function(err, results) {
        var skireport;

        if(err) {console.log(err); res.send(500, 'Server Error'); return;}
        skireport = results[0];
        res.send(skireport);
      }
    );
  },

  loader: function(req, res) {
    res.render('loader');
  },

  dev: function(req, res) {
    res.render('loader');
  }

};
