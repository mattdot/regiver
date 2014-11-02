var request = require('request');

(function() {
	console.log('loading modo lib');

    /*
    * get a token
    */
	exports.getToken = function (callback) {
    	request.post({ 
        url: process.env.MODO_API + "/token", 
        form : { credentials : process.env.MODO_ENCODEDKEY },
        json : true
      }, function(err, response, body) {
        var token = body.response_data.access_token;
        callback(token);
      });
	};
    
    /*
    * 
    */
    exports.registerUser = function (token, data, callback) {
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
    
    /*
    * add a payment card to an account
    * {
    *   account_id : "",
    *   card : {
    *   } 
    * }
    */
    exports.addPaymentCard = function (token, data, callback) {
        request.post({
          url : process.env.MODO_API + "/people/register",
          form : { 
            consumer_key : process.env.MODO_APIKEY,
            access_token : token,
            account_id : data.account_id,
            card_number : data.card.id,
            zip_code : data.card.billing_zip,
            expiry : data.card.expiry,
          }
       }, function(error, response, body) {
          callback();       
       });
    };
})();