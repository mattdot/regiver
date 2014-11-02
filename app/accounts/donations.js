
var modo = require("../../lib/modo.js");

/**
* { card_id, charity_id }
*/
exports.post = function(req, res) {
	modo.getToken(function(token){
		modo.donateGiftCard(token, {
			account_id : req.param("aid"),
			merchant_id : "7827daddf65d483096422d642f46a904"
		}, function(checkout_code){
			modo.checkout(token, {
				checkout_code : checkout_code,
				checkout_amount : 15
			}, function() {
				res.send({
					message: "Thank you for your donation."
				});
				res.end();
			});
		});
	});
};