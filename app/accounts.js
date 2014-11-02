var request = require("request");

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

  exports.post = function(req, res) {
    console.log(JSON.stringify(req.body));
    getToken(function(token) {
      registerUser(token, { phone : req.body.phone, fname : req.body.first_name, lname : req.body.last_name }, function(person) {
        //todo: save somewhere
        res.send(person);
        res.end();
      });
    });
    request.post({ 
        url: process.env.MODO_API + "/token", 
        form : { credentials : process.env.MODO_ENCODEDKEY },
        json : true
      }, function(err, response, body) {
        var token = body.response_data.access_token;
        request.post({ 
          url : process.env.MODO_API + "/people/register",
          form : { 
            consumer_key : process.env.MODO_APIKEY,
            access_token : token,
            phone : req.body.phone, 
            fname : req.body.first_name,
            lname : req.body.last_name,
            should_send_modo_descript: 0,
            is_modo_terms_agree: 1
          },
          json: true
        }, function(regError, regResponse, regBody) {
            res.send({ 
              success : true, 
              url : process.env.MODO_API + '/token', 
              body: body,
              regBody : regBody,
              account : {
                id : regBody.response_data.account_id,
                name : regBody.response_data.first_name + ' ' + regBody.response_data.last_name
              }
            });
  	        res.end();
        });
    });
  };
  
  /*
    exports.post = function(req, res) {
    console.log(JSON.stringify(req.body));
    request.post({ 
        url: process.env.MODO_API + "/token", 
        form : { credentials : process.env.MODO_ENCODEDKEY },
        json : true
      }, function(err, response, body) {
        var token = body.response_data.access_token;
        request.post({ 
          url : process.env.MODO_API + "/people/register",
          form : { 
            consumer_key : process.env.MODO_APIKEY,
            access_token : token,
            phone : req.body.phone, 
            fname : req.body.first_name,
            lname : req.body.last_name,
            should_send_modo_descript: 0,
            is_modo_terms_agree: 1
          },
          json: true
        }, function(regError, regResponse, regBody) {
            res.send({ 
              success : true, 
              url : process.env.MODO_API + '/token', 
              body: body,
              regBody : regBody,
              account : {
                id : regBody.response_data.account_id,
                name : regBody.response_data.first_name + ' ' + regBody.response_data.last_name
              }
            });
  	        res.end();
        });
    });
  };

  */
  
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
