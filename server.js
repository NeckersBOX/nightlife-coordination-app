"use strict";

const express = require ('express');
const fs = require ('fs');
const app = new express ();

const build_err = (err) => {
  return '<html><head><title>500 Error</title></head><body>'
    + '<h1>500 Internal Error</h1>'
    + '<p>' + err + '</p>'
    + '</body></html>';
};

app.get ('/', (req, res) => {
  fs.readFile ('dist/index.html', 'utf8', (err, data) => {
    if ( err ) {
      res.writeHead (500, { 'Content-Type': 'text/html' });
      res.end (build_err (err));
      return console.warn (err);
    }

    res.writeHead (200, { 'Content-Type': 'text/html' });
    res.end (data);
  });
});

app.listen (process.env.PORT || 3000, err => err => {
  if ( err )
    return console.error (err);

  console.log ('Server running on port ' + ( process.env.PORT || 3000 ));
});
