// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Initialize Customers (DATA)
// =============================================================
var customers = [];
var waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// provides JSON
app.get("/api/tables", function(req, res) {
  // when client requests /api/tables, server responds by sending customers array
  res.json(customers);
});

// provides JSON
app.get("/api/waitlist", function(req, res) {
  // when client requests /api/tables, server responds by sending customers array
  res.json(waitlist);
});

// Create New customers - takes in JSON input
app.post("/api/tables", function(req, res) {
  var newcustomer = req.body;
  //newcustomer.routeName = newcustomer.name.replace(/\s+/g, "").toLowerCase();
	console.log(newcustomer);
	if (customers.length < 5){
		customers.push(newcustomer);
		res.json(true);
	}

	else{
		waitlist.push(newcustomer);
		res.json(false);
	}
});

// clear the tables: move waitlist up
app.post("/api/clear", function(req, res) {
	customers = [];
	if ( (waitlist.length < 5) && (waitlist.length > 0) ){
		var waitListLength = waitlist.length;
	}
	if (waitlist.length > 5){
		waitListLength = 5;
	}
	if (waitlist.length === 0){ return; }
	for (var i = 0; i < waitListLength ; i++){
		customers.push(waitlist[i]);
		console.log("i: " + i);
	}
	for (var j = 0; j < waitListLength ; j++){
		waitlist.splice(0,1);
	}
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});