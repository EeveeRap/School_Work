var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hjs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("secret"));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  //Getting and parsing the 'visited' cookie:
  const visited = req.signedCookies.visited
    ? JSON.parse(req.signedCookies.visited)
    : { count: 0, username: "" };

  //Incrementing the visit count:
  visited.count += 1;

  //Storing the updated visit count in the 'visited' cookie:
  res.cookie("visited", JSON.stringify(visited), {
    maxAge: 200000,
    httpOnly: true,
    secure: true,
    signed: true,
  });

  // Making the visit count and username available in the response.locals:
  res.locals.visitCount = visited.count;
  res.locals.username = visited.username;

  next();
});

app.post("/login", (req, res, next) => {
  if (req.body.username) {
    const visited = req.signedCookies.visited
      ? JSON.parse(req.signedCookies.visited)
      : { count: 0, username: "" };

    //Updating the username:
    visited.username = req.body.username;

    //Storing the updated visit count and username in the 'visited' cookie:
    res.cookie("visited", JSON.stringify(visited), {
      maxAge: 200000,
      httpOnly: true,
      secure: true,
      signed: true,
    });
    //Redirecting to the home page:
    res.redirect("/");
  } else {
    //Handling empty username input: (cant get it to work properly)
    res.render("layout", {
      title: "Error",
      partials: {
        content: "error",
      },
      error: "Please don't submit an empty username input",
    });
  }
});

app.use("/username", (req, res, next) => {
  res.render("layout", {
    title: "Enter Username",
    partials: {
      content: "username",
    },
  });
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("layout", {
    partials: {
      content: "error",
    },
  });
});

app.locals.appTitle = "Homework 110";
module.exports = app;
