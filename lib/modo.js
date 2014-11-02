var request = require('request');

(function() {
    var regiver_id = "4e59d1ee06334209a1b31b69c76d4e20";
    var card_images = {
      "Starbucks" : "http://regiverblob.blob.core.windows.net/giftcards/starbucks-360x200.png",
      "Barnes & Noble Booksellers" : "http://regiverblob.blob.core.windows.net/giftcards/barnesandnoble-360x200.png",
      "Bass Pro Shops" : "http://regiverblob.blob.core.windows.net/giftcards/bassproshop-360x200.png",
      "Best Buy" : "http://regiverblob.blob.core.windows.net/giftcards/bestbuy-360x200.png",
      "Lowes" : "http://regiverblob.blob.core.windows.net/giftcards/lowes-360x200.png",
      "Staples" : "http://regiverblob.blob.core.windows.net/giftcards/staples-360x200.png",
      "Target" : "http://regiverblob.blob.core.windows.net/giftcards/target-360x200.png" 
    };
    
    var merchants = {
      "8161fa6cd0c24c6ab9606252713ab571" : {
          title : "Starbucks",
          type : "starbucks",
          image : card_images["Starbucks"]
      }
    };
    
    function extend(target) {
        var sources = [].slice.call(arguments, 1);
        sources.forEach(function (source) {
            for (var prop in source) {
                target[prop] = source[prop];
            }
        });
        return target;
    };
    
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
    
    /**
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
          },
          json : true
       }, function(error, response, body) {
          callback();       
       });
    };
    
    /**
     * addGiftCard
     */
    exports.addGiftCard = function(token, data, callback) {
        request.post({
          url : process.env.MODO_API + "/gift/send",
          form : { 
            consumer_key : process.env.MODO_APIKEY,
            access_token : token,
            account_id : regiver_id,
            receiver_phone : data.phone,
            gift_amount : data.amount,
            should_notify_receiver : 0,
            merchant_id : data.merchant_id
          },
          json : true
        }, function(error, response, body) {
            var m = merchants[data.merchant_id];
            var newCard = {
                id : body.response_data.gift_id,
                value : data.amount,
                value_currency : "USD",
                value_symbol : "$"
            };
            var result = extend({}, m, newCard);
            callback(result);
        });
    };
    
    exports.checkout = function(token, data, callback) {
        console.log('checkout');
         request.post({
          url : process.env.MODO_API + "/location/checkout",
          form : { 
            consumer_key : process.env.MODO_APIKEY,
            access_token : token,
            account_id : data.account_id,
            checkout_code : data.checkout_code,
            checkout_amount : data.checkout_amount
          },
          json : true
        }, 
        function(error, response, body) {
            console.log(body);
            callback(true);
        });
    };
    
    /**
     * 
     */
    exports.donateGiftCard = function(token, data, callback) {
        console.log('donating card');
        request.post({
          url : process.env.MODO_API + "/location/visit",
          form : { 
            consumer_key : process.env.MODO_APIKEY,
            access_token : token,
            account_id : data.account_id,
            merchant_id : data.merchant_id
          },
          json : true
        }, 
        function(error, response, body) {
            console.log(body);
            callback(body.response_data.checkout_code);
        });
    };
    
    /**
     *       {
        type: "starbucks",
        title : "Starbucks",
        image : "http://bit.ly/1sXrVvj",
        value : 15.00,
        value_currency : "USD",
        value_symbol : "$"
      }
      * 
      * 
gift_id: "624c0fca10864ab9a3d996e9123f8c7a",
gift_amount: 15,
gift_balance: 15,
giver_name: "Regiver Account",
giver: "4e59d1ee06334209a1b31b69c76d4e20",
receiver_name: "Mike Downey",
receiver: "45415083d32d4901a41bab9120737269",
valid_at_merchant: null,
user_message: null,
merchant_id: null,
location_id: 0,
date_given: "2014-11-02",
date_used: "UNUSED",
timestamp_updated: 1414912998,
gift_status: "GIVEN"

     */
    exports.getGiftCards = function(token, data, callback) {
        request.post({
          url : process.env.MODO_API + "/offer/lookup",
          form : { 
            consumer_key : process.env.MODO_APIKEY,
            access_token : token,
            account_id : data.account_id
          },
          json : true
        }, 
        function(error, response, body) {
            var cards = body.response_data.gifts
              .filter(function(currentValue){ return currentValue.gift_balance > 0 && currentValue.valid_at_merchant; })
              .map(function(currentValue, index, array){
                var title = currentValue.valid_at_merchant || "VISA"
                return {
                    id : currentValue.gift_id,
                    title : title,
                    image : card_images[title] || "http://regiverblob.blob.core.windows.net/giftcards/lowes-360x200.png",
                    value : currentValue.gift_balance,
                    value_currency : "USD",
                    value_symbol : "$"
                };
            });
          callback(cards);
        });
    };

    /**
     * lookupPhone
     */
     exports.lookupPhone =	function(token, data, callback) {
		request.post({
          url : process.env.MODO_API + "/people/contactcard",
          form : { 
            consumer_key : process.env.MODO_APIKEY,
            access_token : token,
            account_id : data.account_id
          },
          json : true
       }, 
       function(error, response, body) {
          callback(body.response_data.phone);
       }
     );
	};
    
    /**
     * getMerchants
     */
     exports.getMerchants =	function(token, callback) {
		request.post({
          url : process.env.MODO_API + "/merchant/list",
          form : { 
            consumer_key : process.env.MODO_APIKEY,
            access_token : token,
          },
          json : true
       }, 
       function(error, response, body) {
          callback(body.response_data);
       }
     );
	};
})();