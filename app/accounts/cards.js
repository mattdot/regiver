exports.post = function (req, res) {
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

exports.get = function (req, res) {
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
        value : 15.00,
        value_currency : "USD",
        value_symbol : "$"
      }
    ]
  });
  res.end();
};