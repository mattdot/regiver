var request = require("request");
/**
 * 
http://regiverblob.blob.core.windows.net/charities/boysandgirlsclub.png
http://regiverblob.blob.core.windows.net/charities/breast-cancer-research-foundation.png
http://regiverblob.blob.core.windows.net/charities/humane-society.png
http://regiverblob.blob.core.windows.net/charities/red-cross.png
http://regiverblob.blob.core.windows.net/charities/st-judes.png
http://regiverblob.blob.core.windows.net/charities/wounded-warrior.png

 */
(function(){
	exports.get = function(req, res) {
		res.send({
			charities : [
				{
organization_uuid: "b7dcbd36-edd0-11df-ab8c-4061860da51d",
organization_type_id: "1",
organization_name: "HUMANE SOCIETY",
organization_alias: null,
government_id: "431140649",
parent_organization_uuid: "",
address_line_1: "PO BOX 588",
address_line_2: "",
address_line_3: "",
address_line_full: "",
city: "REEDS SPRING",
region: "MO",
postal_code: "65737-0588",
county: "MO",
country: "US",
address_full: "PO BOX 588 REEDS SPRING MO 65737-0588",
phone_number: "",
area_code: "",
url: "",
category_code: "D20",
latitude: "36.7124",
longitude: "-93.372",
revoked: "0",
numFound: null,
mission_statement: null,
logo_path: "http://regiverblob.blob.core.windows.net/charities/humane-society.png"
}, {
organization_uuid: "b7dcbd36-edd0-11df-ab8c-4061860da51e",
organization_type_id: "1",
organization_name: "ST JUDE CHILDRENS HOME",
organization_alias: null,
government_id: "431140648",
parent_organization_uuid: "",
address_line_1: "PO BOX 588",
address_line_2: "",
address_line_3: "",
address_line_full: "",
city: "REEDS SPRING",
region: "MO",
postal_code: "65737-0588",
county: "MO",
country: "US",
address_full: "PO BOX 588 REEDS SPRING MO 65737-0588",
phone_number: "",
area_code: "",
url: "",
category_code: "D20",
latitude: "36.7124",
longitude: "-93.372",
revoked: "0",
numFound: null,
mission_statement: null,
logo_path: "http://regiverblob.blob.core.windows.net/charities/st-judes.png"
}
			]
		});	
	};
})();