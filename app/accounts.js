var request = require("request");
var modo = require('../lib/modo.js');
/**
 * http://regiverblob.blob.core.windows.net/giftcards/barnesandnoble-360x200.png
http://regiverblob.blob.core.windows.net/giftcards/bassproshop-360x200.png
http://regiverblob.blob.core.windows.net/giftcards/bestbuy-360x200.png
http://regiverblob.blob.core.windows.net/giftcards/lowes-360x200.png
http://regiverblob.blob.core.windows.net/giftcards/staples-360x200.png
http://regiverblob.blob.core.windows.net/giftcards/starbucks-360x200.png
http://regiverblob.blob.core.windows.net/giftcards/target-360x200.png

 */

(function(){ 
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
          type: "basspro",
          title : "Bass Pro Shop",
          id : "1234567890123456",
          masked : "**************1233",
          image : "http://regiverblob.blob.core.windows.net/giftcards/bassproshop-360x200.png",
          value : 85.00,
          value_currency : "USD",
          value_symbol : "$"
        },
        {
          type: "bn",
          title: "Barnes & Noble",
          image : "http://regiverblob.blob.core.windows.net/giftcards/barnesandnoble-360x200.png",
          value : 25.00,
          id : "2345678901234567",
          masked : "**************1233",
          value_currency : "USD",
          value_symbol : "$"
        },
        {
          type: "staples",
          title: "Stapes",
          image : "http://regiverblob.blob.core.windows.net/giftcards/staples-360x200.png",
          value : 20.00,
          id : "5345678901234567",
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
              image : "http://regiverblob.blob.core.windows.net/charities/st-judes.png"
          }
      ]
    });
  };

})();
