var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/test');
//var Schema = mongoose.Schema;
var incidentSchema = mongoose.model('Incident', {
  firstName : String,
  lastName : String,
  fullName : String,
  grade : String,
  date : Date,
  othersInvolved : Array,
  nature : String,
  description : String,
  statement : String,
  consequences : String,
  parentPhone : String,
  parentEmail : String
});
var Incident = mongoose.model('Incident', incidentSchema);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


app.get('/incidents', function(req,res) {
	console.log("I received a GET request");
	Incident.find({}, function(err,incident) {
		if (err) {
			console.log(err);
  			res.status(500).send('Something broke!');
  			return next(err);
		}
		console.log(incident);
		res.json(incident);
	});
});

app.post('/incidents', function(req,res) {
	var incident = new Incident();
	incident.firstName = req.body.firstName;
	incident.lastName = req.body.lastName;
	incident.grade = req.body.grade;
	incident.date = req.body.date;
	incident.othersInvolved = req.body.othersInvolved;
	incident.nature = req.body.nature;
	incident.description = req.body.description;
	incident.statement = req.body.statement;
	incident.consequences = req.body.consequences;
	incident.parentPhone = req.body.parentPhone;
	incident.parentEmail = req.body.parentEmail;
	incident.save(function(err){
		if (err)
				res.send(err);
		res.json({message:'incident added'});
	});
});

app.delete('/incidents/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	Incident.findOne({_id:id}, function(err,model) {
		if (err) {
			return;
		}
		model.remove(function (err, doc) {
			res.json(doc);
		});
	});
});

app.get('/incidents/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	Incident.findOne({_id:id}, function(err, model) {
		res.json(model);
	});
});

app.put('/incidents/:id', function(req, res) {
	var id = req.params.id;
	console.log(req.body.firstName);
	Incident.findOneAndUpdate({_id:id},
		{ $set : {firstName : req.body.firstName, 
		lastName : req.body.lastName, 
		grade : req.body.grade,
		date : req.body.date,
		othersInvolved : req.body.othersInvolved,
		nature : req.body.nature,
		description : req.body.description,
		statement : req.body.statement,
		consequences : req.body.consequences,
		parentPhone : req.body.parentPhone,
		parentEmail : req.body.parentEmail}},
		{upsert: true, returnNewDocument : true}, function(err,model) {
			res.json(model);
		}
	)
});

port = process.env.PORT || 3000;

app.listen(port);
console.log('Listening on port: ' + port);