// const express = require("express");
// const morgan = require("morgan");
// const app = express();

// const logger = (req, res, next) => {
//   console.log("I am logger");
//   next();
// };

// const loggerTwo = (req, res, next) => {
//   console.log("I am logger Two");
//   next();
// };

// const commonmw = (req, res, next) => {
//   console.log("commonmw");
//   next(new Error("error occured"));
// };

// const errormw = (err, req, res, next) => {
//   console.log(err.message);
// };

// app.use(morgan("dev"));
// app.use(commonmw);
// app.use(errormw);

// app.listen(3000, function () {
//   console.log("Server is running");
// });

// 테스트 수트 : 테스트 환경으로 모카에서는 describe로 구현
// 테스트 케이스 : 실제 테스트 케이스를 말하며 모카에서는 it으로 구현

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

let users = [
  { id: 1, name: "kim" },
  { id: 2, name: "lee" },
  { id: 3, name: "park" },
];

app.use(morgan("dev"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", function (req, res) {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) return res.status(400).end();

  res.json(users.slice(0, limit));
});

app.get("/users/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) return res.status(400).end();

  const user = users.filter((user) => user.id === id)[0];
  if (!user) return res.status(404).end();
  res.json(user);
});

app.delete("/users/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) return res.status(400).end();

  users = users.filter((user) => user.id !== id);
  res.status(204).end();
});

app.post("/users", (req, res) => {
  req.body.name;
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
