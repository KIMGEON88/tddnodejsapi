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
const app = express();
const port = 3000;

const users = [
  { id: 1, name: "kim" },
  { id: 2, name: "lee" },
  { id: 3, name: "park" },
];

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", function (req, res) {
  res.send("users list");
});

app.post("/users", function (req, res) {
  res.send(users);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
