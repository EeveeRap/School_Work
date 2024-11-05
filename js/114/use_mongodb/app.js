var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

const { MongoClient, ServerApiVersion } = require('mongodb');
// Replace the uri string with your connection string.
//const uri = 'mongodb://127.0.0.1:27017';
const uri = 'mongodb+srv://<username>:<password>@cluster0.ebvluuf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecatedErrors: true
  }
});
async function run() {
  try {
    await client.connect();

    //const database = client.db('one');
    //const presidents = database.collection('presidents');
    //const query = { year: '2024' };
    //const president = await presidents.findOne(query);
    //console.log(president);
    //const presidents = await database.collection('presidents').find().toArray();
    //console.log(presidents);

    //const presidents = await database.collection('presidents').find().project({name: 0}).sort({year: -1}).limit(2);
    // await presidents.forEach(president => console.log(president));
    /*for await (const president of presidents) {
      console.log(president);
    }*/

    /*while (await presidents.hasNext()) {
      console.log(await presidents.next());
    }*/

    const database = client.db('sample_airbnb');
    const listingsAndReviews = database.collection('listingsAndReviews');
    const listing = await listingsAndReviews.findOne();
    console.log(listing);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
