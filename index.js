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

app.use(morgan("dev"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
