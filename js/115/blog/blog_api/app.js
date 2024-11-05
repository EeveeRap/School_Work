import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import session from 'express-session';
import { MongoClient, ServerApiVersion } from 'mongodb';
import cors from 'cors';
import authentication from './routes/authentication.js';
import posts from './routes/posts.js';

const app = express();
const server = http.createServer(app);
const socketIo = new Server(server, {
  cors: 'http://localhost:3000'
});

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 200000
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Replace the uri string with your connection string.
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecatedErrors: true
  }
});

app.use(async (req, res, next) => {
  try {
    await client.connect();
    req.database = client.db('blog2');
    req.socketIo = socketIo;
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/*app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});*/

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use('/', authentication);
app.use('/posts', posts);

app.use(function (req, res, next) {
  const error = new Error('No such endpoint');
  error.statusCode = 404;
  next(error);
});

app.use(function (err, req, res) {
  res.status(err.statusCode || 500);
  res.send(err.message);
});

socketIo.on('connect', () => {
  console.log('got connection');
});

server.listen(8080);
