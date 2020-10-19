const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sqlite = require('sqlite3');
const fileUpload = require('express-fileupload');
const indexRouter = require('./routes/index');
const port = 3000;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());

// Register Routes
app.use('/', indexRouter);

app.use((req, res, next) => {
  next(createError(404));
});

// Error Handling
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});

module.exports = app;
