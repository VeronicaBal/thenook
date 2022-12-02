const cors = require("cors");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var booksRouter = require("./routes/books");
var clubsRouter = require("./routes/clubs");
var usersClubs = require("./routes/users_clubs");

var app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/client/build')));

app.use("/users", usersRouter);
app.use("/books", booksRouter);
app.use("/clubs", clubsRouter);
app.use(authRouter);
app.use(usersClubs);
app.get("*", (req, res) => { 
  res.sendFile(path.join(__dirname + '/client/build/index.html')); 
})

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// General error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({ error: err.message });
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Our app is running on port ${ PORT }`);
// });


module.exports = app;
