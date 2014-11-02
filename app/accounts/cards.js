var modo = require('../../lib/modo.js');

exports.post = function (req, res) {
  modo.getToken(function(token) {
    modo.lookupPhone(token, {
      account_id : req.param("aid")
    }, 
    function(phone) {
      modo.addGiftCard(token, {
        phone : phone,
        amount : 15.00,
        card_number : req.body.id,
        type : req.body.type,
        merchant_id : req.body.merchant_id || "8161fa6cd0c24c6ab9606252713ab571" //starbucks
      },
      function(gift){
        res.send(gift);
        res.end();
      });
    });
  });
};

exports.get = function (req, res) {
  modo.getToken(function(token) {
    var aid = req.param("aid");
    modo.getGiftCards(token, {
      account_id : aid
    },
    function(cards) {
      res.send({
        cards: cards
      });
      res.end();
    });
  });
  /*
   res.send({
    cards: [
      {
        type: "starbucks",
        title : "Starbucks",
        image : "http://bit.ly/1sXrVvj",
        value : 15.00,
        value_currency : "USD",
        value_symbol : "$"
      },
      {
        type: "microsoft",
        title: "Microsoft Store",
        image : "http://bit.ly/1qgTrnA",
        value : 75.00,
        value_currency : "USD",
        value_symbol : "$"
      }
    ]
  });
  res.end();
  */
};

exports.get2 = function(req, res) {
  
};

exports.post2 = function(req, res) {
    res.send({
    id : req.body.id,
    type : req.body.type,
    title : "Starbucks",    
    masked : "**************1233",
    image : "http://bit.ly/1sXrVvj",
    value : 15.00,
    value_currency : "USD",
    value_symbol : "$"
  });
  res.end();
};