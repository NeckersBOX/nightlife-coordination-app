"use strict";

const express = require ('express');
const path = require ('path');
const fs = require ('fs');
const app = new express ();

app.set ('view engine', 'ejs');
app.set ('views', path.join (__dirname, 'src/views'));
app.use (express.static ('dist'));

app.get ('/', (req, res) => res.render ('index', {
  loading: '<div class="loading"></div>',
  loading_info: '<!-- Loaded time: ' + (new Date ().getTime ()) + ' -->'
}));

app.listen (process.env.PORT || 3000, err => {
  if ( err )
    return console.error (err);

  console.log ('Server running on port ' + ( process.env.PORT || 3000 ));
});
