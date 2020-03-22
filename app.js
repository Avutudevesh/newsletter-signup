const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var email = req.body.email;
	var data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName
				}
			}
		]
	};
	var jsonData = JSON.stringify(data);
	var url = "https://us19.api.mailchimp.com/3.0/lists/c0f97ce264";
	var options = {
		method: "POST",
		auth: "devesh:431bd1a7cb1ff09da326f8e5a6e060c1-us19"
	};
	const request = https.request(url, options, function(response) {
		if (response.statusCode == 200) {
			res.sendFile(__dirname + "/success.html");
		} else {
			res.sendFile(__dirname + "/failure.html");
		}
	});
	request.write(jsonData);
	request.end();
});
app.listen(3000, function(req, res) {
	console.log("server started on port 3000");
});

// API Key
// 431bd1a7cb1ff09da326f8e5a6e060c1-us19
// List Id
// c0f97ce264
