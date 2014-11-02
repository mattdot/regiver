var express = require('express');
var bodyParser = require('body-parser');

console.log('starting up');

var app = express();
var jsonParser = bodyParser.json();

app.use(jsonParser);

var accounts = require('./app/accounts.js');
var accounts_cards = require('./app/accounts/cards.js');

app.get('/accounts/:aid', accounts.get);
app.post('/accounts', accounts.post);

app.get('/accounts/:aid/cards', accounts_cards.get);
app.post('/accounts/:aid/cards', accounts_cards.post);

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
  
});  