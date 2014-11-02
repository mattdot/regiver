var request = require("request");

exports.post = function(req, res) {
  
  request();
  
	res.send({ success : true });
	res.end;
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