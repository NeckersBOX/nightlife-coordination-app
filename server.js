"use strict";

const express = require ('express');
const path = require ('path');
const fs = require ('fs');
const bodyParser = require ('body-parser');
const Yelp = require ('yelp');
const MongoDB = require ('mongodb').MongoClient;
const md5 = require ('md5');

const buildHTTPError = (res, status, writeHead) => {
  let desc = {
    400: 'Bad Request',
    404: 'Not Found',
    500: 'Internal Server Error'
  };

  if ( writeHead )
    res.writeHead (status, { 'Content-Type': 'application/json' });

  res.end (JSON.stringify ({
    status: status,
    error: true,
    description: desc[status]
  }));
};

const app = new express ();

const yelp = new Yelp ({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  token: process.env.token,
  token_secret: process.env.token_secret
});

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
    return buildHTTPError (res, 400, true);

  let location = req.body.location.trim ();
  if ( !location.length )
    return buildHTTPError (res, 400, true);

  res.writeHead (200, { 'Content-Type': 'application/json' });

  yelp.search ({ term: 'bar,food', location: location, limit: 20, offset: req.body.offset || 0 })
    .then (function (data) {
      res.end (JSON.stringify ({ error: false, res: data }));
    })
    .catch (function (err) {
      res.end (JSON.stringify ({ error: err }));
    });
});

app.post ('/signup', (req, res) => {
  if ( !req.body.hasOwnProperty ('username') || !req.body.hasOwnProperty ('password') )
    return buildHTTPError (res, 400, true);

  let user_data = {
    username: req.body.username.trim (),
    password: req.body.password
  };

  res.writeHead (200, { 'Content-Type': 'application/json' });

  if ( user_data.username.length < 8 )
    return res.end (JSON.stringify ({ error: 'Username minimum characters 8' }));

  if ( user_data.password.length < 8 )
    return res.end (JSON.stringify ({ error: 'Password minimum characters 8' }));

  MongoDB.connect (process.env.mongodb_uri, (err, db) => {
    if ( err )
      return buildHTTPError (res, 500, false);

    let collection = db.collection ('nightlife_users');

    collection.findOne ({ username: user_data.username }, (err, doc) => {
      if ( err ) {
        db.close ();
        return buildHTTPError (res, 500, false);
      }

      if ( doc ) {
        db.close ();
        return res.end (JSON.stringify ({ error: 'Username already exists' }));
      }

      collection.insertOne ({
        username: user_data.username,
        password: md5 (user_data.password),
        register_data: new Date ().getTime (),
        token: 'no-access'
      }, (err, r) => {
        if ( err ) {
          db.close ();
          return buildHTTPError (res, 500, false);
        }

        res.end (JSON.stringify ({ error: null }));
        db.close ();
      });
    });
  });
});

app.post ('/login', (req, res) => {
  if ( !req.body.hasOwnProperty ('username') || !req.body.hasOwnProperty ('password') )
    return buildHTTPError (res, 400, true);

  let user_data = {
    username: req.body.username.trim (),
    password: req.body.password
  };

  res.writeHead (200, { 'Content-Type': 'application/json' });

  if ( user_data.username.length < 8 )
    return res.end (JSON.stringify ({ error: 'Username minimum characters 8' }));

  if ( user_data.password.length < 8 )
    return res.end (JSON.stringify ({ error: 'Password minimum characters 8' }));

  MongoDB.connect (process.env.mongodb_uri, (err, db) => {
    if ( err )
      return buildHTTPError (res, 500, false);

    let collection = db.collection ('nightlife_users');

    collection.findOne ({
      username: user_data.username,
      password: md5 (user_data.password)
    }, (err, doc) => {
      if ( err ) {
        db.close ();
        return buildHTTPError (res, 500, false);
      }

      if ( !doc ) {
        db.close ();
        return res.end (JSON.stringify ({ error: 'Username doesn\'t exists' }));
      }

      let token = md5 (doc.name + new Date ().getTime ());
      collection.findOneAndReplace ({ _id: doc._id },
        Object.assign ({}, doc, { token: token }), (err, r) => {
        if ( err ) {
          db.close ();
          return buildHTTPError (res, 500, false);
        }

        res.end (JSON.stringify ({
          error: null,
          name: user_data.username,
          token: token
        }));

        db.close ();
      });
    });
  });
});

app.post ('/logout', (req, res) => {
  if ( !req.body.hasOwnProperty ('token') )
    return buildHTTPError (res, 400, true);

  if ( req.body.token.length != 32 )
    return buildHTTPError (res, 400, true);

  res.writeHead (200, { 'Content-Type': 'application/json' });

  MongoDB.connect (process.env.mongodb_uri, (err, db) => {
    if ( err )
      return buildHTTPError (res, 500, false);

    let collection = db.collection ('nightlife_users');
    collection.findOne ({ token: req.body.token }, (err, doc) => {
      if ( err ) {
        db.close ();
        return buildHTTPError (res, 500, false);
      }

      if ( !doc ) {
        db.close ()
        return res.end ({ error: 'No login found.' });
      }

      collection.findOneAndReplace ({ _id: doc._id },
        Object.assign ({}, doc, { token: null }), (err, r) => {
        if ( err ) {
          db.close ();
          return buildHTTPError (res, 500, false);
        }

        res.end (JSON.stringify ({ error: null }));
        db.close ();
      })
    });
  });
});

app.post ('/users-going', (req, res) => {
  if ( !req.body.hasOwnProperty ('id') )
    return buildHTTPError (res, 400, true);

  res.writeHead (200, { 'Content-Type': 'application/json' });

  MongoDB.connect (process.env.mongodb_uri, (err, db) => {
    if ( err )
      return buildHTTPError (res, 500, false);

    let collection = db.collection ('nightlife_going');

    collection.count ({ business_id: req.body.id }, (err, count) => {
      if ( err ) {
        db.close ();
        return buildHTTPError (res, 500, false);
      }

      db.close ();
      res.end (JSON.stringify ({ error: false, usersGoing: count }));
    });
  });
});

app.listen (process.env.PORT || 3000, err => {
  if ( err )
    return console.error (err);

  console.log ('Server running on port ' + ( process.env.PORT || 3000 ));
});
