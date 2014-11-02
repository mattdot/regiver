/*
{ card_id, charity_id }
*/
exports.post = function(req, res) {
	res.send({
		message: "Thank you for your donation to " + req.body.charity_id + "."
	});
	res.end();
};