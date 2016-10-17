var mongoose = require('mongoose');
var random = require('mongoose-query-random');
var City = require('./databaseinitialization.js');


module.exports = {

  //randomly select a city from a list of names in DB
  randomQuery: function(callback){
    var names = ['Chicago', 'San Francisco', 'London', 'Istanbul', 'New York'];
      var randomIndex = Math.floor(Math.random() * names.length);
      //use that city name to query database and return tuple of lat/long coords.
      City.find().where('city_name').equals(names[randomIndex]).then(function(results) {
        //randomly select a point of interest from results
        var randomIndex2 = Math.floor(Math.random() * results.length);
        //send results back to client
        callback([results[randomIndex2].lat, results[randomIndex2].lng])
      })
      .catch(function(err) {
        if(err) {
          //send error back to client
          callback(err)
        }
      })
    },


    //getAllQuery is mainly used for debugging purposes via postman
    //it is a more convenient alternative to logging on to droplet and querying
    //mongodB from there
    getAllQuery: function(city, callback) {
      //if a city was given as a query parameter, return only that cities' results
      if(city) {
        City.find().where('city_name').equals(city).then(function(results) {
          callback(results);
        })
        .catch(function(err) {
          callback(err);
        }); 
      } else {//if no city was given as a query parameter, return all results
        City.find().then(function(results) {
          callback(results);
        })
        .catch(function(err) {
          callback(err);
        })
      }
    },

    //the following function is used for database maintenence.  If a value is 
    //noticed to be incorrect, the databse can be updated by a simple post 
    //request from postman.
    updateEntry: function(lookup, update, callback) {
      City.findOneAndUpdate(lookup, update, {new: true}, function(err, result) {
        if(err) {
          callback(err);
        } else {
          callback(result);
        }
      })

    }
};

// module.exports = {

//   //randomly select a city from a list of names in DB
//   randomQuery: function(callback){
//     var names = ['Chicago', 'San Francisco', 'London', 'Istanbul', 'New York'];
//       var randomIndex = Math.floor(Math.random() * names.length);
//       //use that city name to query database and return tuple of lat/long coords.
//       City.find().where('city_name').equals(names[randomIndex]).random(1, true, function (err, cities) {
//         if (err) {
//           callback(err)
//         } else {
//         //send coordinates back to client via server
//           callback([cities[0].lat, cities[0].lng]);  
//         }
//       });
//   }
// };