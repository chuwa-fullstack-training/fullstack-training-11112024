/**
 * Refactor hw1 and hw2 in lecture 7 in Express.js.
 * Requirements:
 * 1. make two routers, one for hw1 and one for hw2;
 * 2. hw1 should be able to handle requests with url params, rather than command-line arguments;
 *  - e.g. http://localhost:3000/hw1/<dir>/<ext>
 *  - `dir` only support one level down from the current repository,
 *    i.e http://localhost:3000/hw1/test/txt.
 *    You don't need to handle the case like http://localhost:3000/hw1/test/test/txt.
 * 3. hw2 should be able to handle requests with query strings like it did in lecture 7;
 */

const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

const hw1Router = require('./hw1routers/hw1');
const hw2Router = require('./hw1routers/hw2');

app.use('/', hw1Router);
app.use('/', hw2Router);
app.use('*', (req, res) => {
  res.send('404 Not Found');
})

app.listen(port, () => console.log(`Server is running on port ${port}`));