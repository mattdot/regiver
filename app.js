var express = require('express');
var app = express();


// respond with "Hello World!" on the homepage
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/accounts/:aid/cards', function (req, res) {
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
});

app.get('/accounts/:aid', function(req, res) {
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
});

app.post('/accounts/:aid/cards', function (req, res) {
  res.send({
    id : req.body.id,
    "type" : req.body.type,
    title : "Starbucks",    
    masked : "**************1233",
    image : "http://bit.ly/1sXrVvj",
    value : 15.00,
    value_currency : "USD",
    value_symbol : "$"
  });
  res.end();
});

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
  
});