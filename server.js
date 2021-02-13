const express = require('express');
const app = express();
const mg = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;

mg.connect("mongodb://localhost:27017/busDB", {useNewUrlParser:true, useUnifiedTopology:true});
const ticket = new mg.Schema({
	name:String,
	number: String,
	from: String,
	to: String,
	date: Date,
	bus: String,
	seat: String
});
const User = new mg.model("user", ticket);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
	res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res)=>{
	let from = req.body.from;
	let to = req.body.to;
	let date = req.body.date;
	let bus = req.body.bus;
	let seat = req.body.seat;
	User.findOne({from: from, to: to, date: date, bus: bus, seat: seat}, (err, foundTicket)=> {
		if(err) res.send(`<body onload="alert('OOPS, we've got an error! RELOAD')"></body>`);
		if(foundTicket) res.send(`<body onload="alert('Ticket is already booked! RELOAD')"></body>`);
		else {
			var newTicket = new User(req.body);
			newTicket.save()
			.then(item=> {
				res.send(`<body onload="alert('Booyah! Your ticket is booked! RELOAD')"></body>`);
			})
			.catch(err => {
				res.status(400).send(`<body onload="alert('Couldn't find what you were searching for..! RELOAD')"></body>`);
			})
		}
	})
})

app.listen(port, ()=>{
	console.log("Server is up and running at localhost:8000");
})
