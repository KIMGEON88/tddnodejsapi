const app = require("../index");
const syncDb = require("./sync-db");

const port = 3000;
// db와 ORM 동기화
syncDb().then((_) => {
  console.log("Sync Database!");
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
