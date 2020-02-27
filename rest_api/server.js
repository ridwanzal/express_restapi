var express = require('express')
	app = express(),
	port = process.env.PORT || 3002,
	bodyParser = require('body-parser'),
	sha1 = require('sha1'),
	

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var routes = require('./routes');
routes(app);

app.use((err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
        res.status(500).send(err.message);
	}
});

app.listen(port);
console.log('Run API for landing page ' + port);
