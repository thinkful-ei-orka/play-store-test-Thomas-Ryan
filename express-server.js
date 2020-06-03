'use strict';

const express = require('express');
const morgan = require('morgan');
const app = express();
const store = require('./playstore');
app.use(morgan('common'));

app.get('/apps', (req, res) => {
  let responseData = store;
  const { sort, genres } = req.query;

  if (sort) {
    responseData.sort((a, b) => {
      if (a[sort] < b[sort]) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  if (genres) {
    responseData = responseData.filter((result) =>
      result.Genres.includes(genres)
    );
  }

  res.json(responseData);
});

app.listen(3000, () => {
  console.log('Express server is listening on port 3000!');
});
