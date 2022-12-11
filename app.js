var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const userRouter = require('./app/user/route');
const tukangRouter = require('./app/tukang/route');
const penyewaRouter = require('./app/penyewa/route');
const customErrorHandler = require('./middleware/customErrorHandler');
const page404NotFound = require('./middleware/handler404NotFound');
var app = express();
require('dotenv').config();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// cara cors lain
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     res.header("Access-Control-Allow-Credentials", 'true');
//     next();
//   });

app.use('/user', userRouter);
app.use('/tukang', tukangRouter);
app.use('/penyewa', penyewaRouter);

app.use(customErrorHandler);
app.use(page404NotFound);


module.exports = app;
