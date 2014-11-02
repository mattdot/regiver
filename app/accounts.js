var request = require("request");
var modo = require('../lib/modo.js');

<<<<<<< HEAD
(function(){ 
=======
(function(){
  function getToken(callback) {
    request.post({ 
        url: process.env.MODO_API + "/token", 
        form : { credentials : process.env.MODO_ENCODEDKEY },
        json : true
      }, function(err, response, body) {
        var token = body.response_data.access_token;
        callback(token);
      });
  };
  // commment
  
  function registerUser(token, data, callback) {
    request.post({ 
          url : process.env.MODO_API + "/people/register",
          form : { 
            consumer_key : process.env.MODO_APIKEY,
            access_token : token,
            phone : data.phone, 
            fname : data.first_name,
            lname : data.last_name,
            should_send_modo_descript: 0,
            is_modo_terms_agree: 1
          },
          json: true
        }, function(error, response, body) {
          
          callback({
            id: body.response_data.account_id,
            name : body.response_data.first_name + ' ' + body.response_data.last_name,
            phone : body.response_data.phone
          });
     });
  };

>>>>>>> 7f58056d558914f1a0c844a5abd784f9e717a5e8
  exports.post = function(req, res) {
    console.log(JSON.stringify(req.body));
    modo.getToken(function(token) {
      modo.registerUser(token, { phone : req.body.phone, first_name : req.body.first_name, last_name : req.body.last_name }, function(person) {
        //todo: save somewhere
        console.log("user registered");
        modo.addPaymentCard(token, {
          account_id : person.id,
          card : {
            id : "1111111111111111",
            expiry : "1220",
            billing_zip : "75769"
          }
        }, function(){
          res.send(person);
          res.end();
        });
      });
    });
  };
  
  exports.get = function(req, res) {
    res.send({
      id : 123,
      name : "Mike Downey",
      images : {
        profile : "https://avatars0.githubusercontent.com/u/71873?v=2&s=460"
      },
      cards : [
        {
          type: "starbucks",
          title : "Starbucks",
          id : "1234567890123456",
          masked : "**************1233",
          image : "http://bit.ly/1sXrVvj",
          value : 15.00,
          value_currency : "USD",
          value_symbol : "$"
        },
        {
          type: "microsoft",
          title: "Microsoft Store",
          image : "http://bit.ly/1qgTrnA",
          value : 15.00,
          id : "2345678901234567",
          masked : "**************1233",
          value_currency : "USD",
          value_symbol : "$"
        }
      ],
      employer : {
        title : "Microsoft",
        matching : true,
        matching_amount : 1.0
      },
      charities : [
          { 
              title : "St. Jude's Children's Hospital",
              image : "http://www.mamanista.com/wp-content/uploads/2013/11/StJude_TG_logo.jpg"
          }
      ]
    });
  };

})();
