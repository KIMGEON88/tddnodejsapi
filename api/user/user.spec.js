// 테스트 코드
const app = require("../../index");
const request = require("supertest");
const should = require("should");
const models = require("../../models");

describe("GET/ users는", () => {
  const users = [{ name: "alice" }, { name: "joe" }, { name: "chris" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => {
    return models.User.bulkCreate(users);
  });
  describe("성공시", () => {
    it("유저 객체를 담은 배열로 응답한다.", (done) => {
      request(app)
        .get("/users")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });
    it("유저 객체를 담은 배열로 응답한다.", (done) => {
      request(app)
        .get("/users?limit=2")
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done();
        });
    });
  });

  describe("실패시", () => {
    it("limit이 숫자형이 아니면 400을 응답한다.", (done) => {
      request(app).get("/users?limit=two").expect(400).end(done);
    });
  });
});
describe("GET/users:1는", () => {
  const users = [{ name: "alice" }, { name: "joe" }, { name: "chris" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => {
    return models.User.bulkCreate(users);
  });
  describe("성공시", () => {
    it("id가 1인 유저 객체를 반환한다", (done) => {
      request(app)
        .get("/users/1")
        .end((err, res) => {
          res.body.should.have.property("id", 1);
          done();
        });
    });
  });
  describe("실패시", () => {
    it("id로 유저를 찾을 수 없을 경우 404로 응답한다", (done) => {
      request(app).get("/users/999").expect(404).end(done);
    });
    it("id로 숫자가 아닐 경우 400으로 응답한다", (done) => {
      request(app).get("/users/one").expect(400).end(done);
    });
  });
});
describe("GET /users:1", () => {
  const users = [{ name: "alice" }, { name: "joe" }, { name: "chris" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => {
    return models.User.bulkCreate(users);
  });
  describe("성공시", () => {
    it("204를 응답한다", (done) => {
      request(app).delete("/users/1").expect(204).end(done);
    });
  });
  describe("실패시", () => {
    it("id가 숫자가 아닐 경우 400으로 응답한다", (done) => {
      request(app).delete("/users/one").expect(400).end(done);
    });
  });
});
describe("POST /users", () => {
  const users = [{ name: "alice" }, { name: "joe" }, { name: "chris" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => {
    return models.User.bulkCreate(users);
  });
  describe("성공시", () => {
    let body;
    before("201상태 코드를 반환한다", (done) => {
      request(app)
        .post("/users")
        .send({ name: "choi" })
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });

    it("생성된 유저 객체를 반환한다", () => {
      body.should.have.property("id");
    });
    it("입력한 name을 반환한다", () => {
      body.should.have.property("name", "choi");
    });
  });
  describe("실패시", () => {
    it("name 파라미터 누락시 400을 반환한다", (done) => {
      request(app).post("/users").send({}).expect(400).end(done);
    });
    it("name이 중복일 경우 409을 반환한다", (done) => {
      request(app).post("/users").send({ name: "joe" }).expect(409).end(done);
    });
  });
});
describe.only("PUT /users/:id", () => {
  const users = [{ name: "alice" }, { name: "joe" }, { name: "chris" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => {
    return models.User.bulkCreate(users);
  });
  describe("성공시", () => {
    it("변경된 name을 응답한다", (done) => {
      request(app)
        .put("/users/3")
        .send({ name: "jang" })
        .end((err, res) => {
          res.body.should.have.property("name", "jang");
          done();
        });
    });
  });
  describe("실패시", () => {
    it("정수가 아닌 id일 경우 400을 응답한다", (done) => {
      request(app).put("/users/one").expect(400).end(done);
    });
    it("name이 없을 경우 400을 응답한다", (done) => {
      request(app).put("/users/1").send({}).expect(400).end(done);
    });
    it("없는 유저일 경우 400을 응답한다", (done) => {
      request(app).put("/users/999").send({ name: "ko" }).expect(404).end(done);
    });
    it("이름이 중복일 경우 400을 응답한다", (done) => {
      request(app).put("/users/3").send({ name: "joe" }).expect(409).end(done);
    });
  });
});
