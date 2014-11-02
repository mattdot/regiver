var request = require("request");

(function(){
  
	  function getToken(callback) {
      request.post({ 
        url: process.env.MODO_API + "/token", 
        form : { credentials : process.env.MODO_ENCODEDKEY },
        json : true
      }, 
      function(err, response, body) {
        var token = body.response_data.access_token;
        callback(token);
      });
  };
  
	function getMerchants(token, callback) {
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
	
	exports.get = function(req,res) {
		getToken(function(token) {
			getMerchants(token, function(merchants){
				res.send(merchants);
				res.end();
			});
		});
	};
})();