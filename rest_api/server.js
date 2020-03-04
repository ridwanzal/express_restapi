var express = require('express')
	app = express(),
	compression = require('compression')
	port = process.env.PORT || 3002,
	bodyParser = require('body-parser'),
	sha1 = require('sha1'),
	cors = require('cors'),
	nodemailer = require('nodemailer'),
	helmet  = require('helmet'),
	path = require('path'),
	sha256 = require('sha256'),
	morgan = require('morgan'),
	dns_prefetch_control = require('dns-prefetch-control'),
	hide_powered_by = require('hide-powered-by'),
	xss_filter = require('x-xss-protection'),

	app.usr(compression());
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json()); // enable body parser 
	app.use(cors()); // enable cross origin 
	app.use(morgan()); // log request to console
	app.use(helmet()); // enable content security policy 
	app.use(dns_prefetch_control()); // dns prefectching
	app.use(hide_powered_by()); // hide powered by info
	app.use(xss_filter()); // xss filter

var routes = require('./routes');
routes(app);

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use((err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
        res.status(500).send(err.message);
	}
});

app.listen(port);
console.log('Run API for landing page ' + port);
