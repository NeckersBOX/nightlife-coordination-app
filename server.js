"use strict";

const express = require ('express');
const path = require ('path');
const fs = require ('fs');
const bodyParser = require ('body-parser');
const Yelp = require ('yelp');

const buildHTTPError = (res, status) => {
  let desc = {
    400: 'Bad Request',
    404: 'Not Found',
    500: 'Internal Server Error'
  };

  res.writeHead (status, { 'Content-Type': 'application/json' });
  res.end (JSON.stringify ({
    status: status,
    error: true,
    description: desc[status]
  }));
};

const app = new express ();

app.set ('view engine', 'ejs');
app.set ('views', path.join (__dirname, 'src/views'));
app.use (express.static ('dist'));
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({ extended: true }));

app.get ('/', (req, res) => res.render ('index', {
  loading: '<div class="loading"></div>',
  loading_info: '<!-- Loaded time: ' + (new Date ().getTime ()) + ' -->'
}));

app.post ('/locations', (req, res) => {
  if ( !req.body.hasOwnProperty ('location') )
    return buildHTTPError (res, 400);

  let location = req.body.location.trim ();
  if ( !location.length )
    return buildHTTPError (res, 400);

  let yelp = new Yelp ({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    token: process.env.token,
    token_secret: process.env.token_secret
  });

  res.writeHead (200, { 'Content-Type': 'application/json' });

  yelp.search ({ term: 'bar,food', location: location })
    .then (function (data) {
      res.end (JSON.stringify ({ error: false, res: data }));
    })
    .catch (function (err) {
      res.end (JSON.stringify ({ error: true, desc: err }));
    });
});

app.listen (process.env.PORT || 3000, err => {
  if ( err )
    return console.error (err);

  console.log ('Server running on port ' + ( process.env.PORT || 3000 ));
});
