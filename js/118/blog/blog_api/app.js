import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import session from 'express-session';
import authentication from './routes/authentication.js';
import posts from './routes/posts.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

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

await mongoose.connect('mongodb://127.0.0.1:27017/blog2');

app.use(async (req, res, next) => {
  try {
    req.socketIo = socketIo;
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', authentication);
app.use('/api/posts', posts);

app.use(function (req, res, next) {
  const error = new Error('No such endpoint');
  error.statusCode = 404;
  next(error);
});

app.use(function (err, req, res, next) {
  res.status(err.statusCode || 500);
  res.send(err.message);
});

socketIo.on('connect', () => {
  console.log('got connection');
});

server.listen(8080);
