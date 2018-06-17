const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const url = require('url');
const path = require('path');

// insert endpoints and ports:
const titleGalleryUrl = 'http://airbnb-title-galley.us-west-1.elasticbeanstalk.com/';
// const titleGalleryPort = 3005;
const listingDescriptionUrl = 'http://nappbnb-env-1.yykbu3dn27.us-east-1.elasticbeanstalk.com/';
// const listingDescriptionPort = 3001;
const reviewsUrl = 'http://nappbnbreviews-env.acrtepa3vp.us-west-1.elasticbeanstalk.com/';
// const reviewsPort = 3003;
const filterListingsUrl = 'http://nappfilterlistingryan-env.n93dfz3d6f.us-west-1.elasticbeanstalk.com/';
// const filterListingsPort = 3004;
const bookingUrl = 'http://booking-service-logan.us-west-1.elasticbeanstalk.com/';
// const bookingPort = 3002;

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


// handle /titlegallerycomponent routes
app.use('/titlegallerycomponent', async (req, res) => {
  const redirectUrl = new url.URL(req.url, titleGalleryUrl);
  // redirectUrl.port = titleGalleryPort;
  res.redirect(307, redirectUrl);
});

// handle /headerphotos routes
app.use('/headerphotos', (req, res) => {
  const redirectUrl = new url.URL(req.originalUrl, titleGalleryUrl);
  // redirectUrl.port = titleGalleryPort;
  res.redirect(307, redirectUrl);
});

// handle /listingdescriptioncomponent routes
app.use('/listingdescriptioncomponent', async (req, res) => {
  const redirectUrl = new url.URL(req.url, listingDescriptionUrl);
  // redirectUrl.port = listingDescriptionPort;
  res.redirect(307, redirectUrl);
});

// handle /rooms routes
app.use('/rooms', (req, res) => {
  const redirectUrl = new url.URL(req.originalUrl, listingDescriptionUrl);
  // redirectUrl.port = listingDescriptionPort;
  res.redirect(307, redirectUrl);
});

// handle /reviewcomponent routes
app.use('/reviewcomponent', async (req, res) => {
  const redirectUrl = new url.URL(req.url, reviewsUrl);
  // redirectUrl.port = reviewsPort;
  res.redirect(307, redirectUrl);
});

// handle /reviews routes
app.use('/reviews', (req, res) => {
  const redirectUrl = new url.URL(req.originalUrl, reviewsUrl);
  // redirectUrl.port = reviewsPort;
  res.redirect(307, redirectUrl);
});

// handle /filterlistingscomponent routes
app.use('/filterlistingscomponent', async (req, res) => {
  const redirectUrl = new url.URL(req.url, filterListingsUrl);
  // redirectUrl.port = filterListingsPort;
  res.redirect(307, redirectUrl);
});

// handle /filterlistings routes
app.use('/filterlistings', (req, res) => {
  const redirectUrl = new url.URL(req.originalUrl, filterListingsUrl);
  // redirectUrl.port = filterListingsPort;
  res.redirect(307, redirectUrl);
});

// handle /bookingservicecomponent routes
app.use('/bookingservicecomponent', async (req, res) => {
  const redirectUrl = new url.URL(req.url, bookingUrl);
  // redirectUrl.port = bookingPort;
  res.redirect(307, redirectUrl);
});

// handle /booking routes
app.use('/booking', (req, res) => {
  const redirectUrl = new url.URL(req.originalUrl, bookingUrl);
  // redirectUrl.port = bookingPort;
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
