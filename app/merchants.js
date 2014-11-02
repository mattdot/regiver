var request = require("request");
var modo = require("../lib/modo.js");

(function(){
  exports.get = function(req,res) {
		modo.getToken(function(token) {
			modo.getMerchants(token, function(merchants){
				res.send(merchants);
				res.end();
			});
		});
	};
})();