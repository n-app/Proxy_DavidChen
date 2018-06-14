const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const url = require('url');
const path = require('path');

const app = express();

// use morgan to log incoming reuests
app.use(morgan('dev'));

// use body-parser to parse the request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// handle cors
/* eslint-disable consistent-return */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Mehods',
      'GET, POST, PUT, PATCH, DELETE',
    );
    return res.status(200).json({});
  }
  next();
});
/* eslint-enable consistent-return */

// serve up the pages
app.use(express.static(path.join(__dirname, '../public')));
app.get('/favicon.ico', (req, res) => res.status(204));


// handle /listingdescriptioncomponent routes
app.use('/listingdescriptioncomponent', async (req, res) => {
  const redirectUrl = new url.URL(req.url, 'http://localhost/');
  redirectUrl.port = 3001;
  res.redirect(307, redirectUrl);
});

// handle /rooms routes
app.use('/rooms', (req, res) => {
  const redirectUrl = new url.URL(req.originalUrl, 'http://localhost/');
  redirectUrl.port = 3001;
  res.redirect(307, redirectUrl);
});

// handle /reviewcomponent routes
app.use('/reviewcomponent', async (req, res) => {
  const redirectUrl = new url.URL(req.url, 'http://localhost/');
  redirectUrl.port = 3003;
  res.redirect(307, redirectUrl);
});

// handle /reviews routes
app.use('/reviews', (req, res) => {
  const redirectUrl = new url.URL(req.originalUrl, 'http://localhost/');
  redirectUrl.port = 3003;
  res.redirect(307, redirectUrl);
});

// handle /filterlistingscomponent routes
app.use('/filterlistingscomponent', async (req, res) => {
  const redirectUrl = new url.URL(req.url, 'http://localhost/');
  redirectUrl.port = 3004;
  res.redirect(307, redirectUrl);
});

// handle /filterlistings routes
app.use('/filterlistings', (req, res) => {
  const redirectUrl = new url.URL(req.originalUrl, 'http://localhost/');
  redirectUrl.port = 3004;
  res.redirect(307, redirectUrl);
});

// handle /filterlistingscomponent routes
app.use('/bookingservicecomponent', async (req, res) => {
  const redirectUrl = new url.URL(req.url, 'http://localhost/');
  redirectUrl.port = 3002;
  res.redirect(307, redirectUrl);
});

// handle /filterlistings routes
app.use('/booking', (req, res) => {
  const redirectUrl = new url.URL(req.originalUrl, 'http://localhost/');
  redirectUrl.port = 3002;
  res.redirect(307, redirectUrl);
});

// handle error
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

/* eslint-disable no-unused-vars */
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
/* eslint-enable no-unused-vars */

// determine listening port
const port = process.env.port || 3000;
const server = http.createServer(app);
server.listen(port);
console.log(`Proxy listening on port ${port}`);
