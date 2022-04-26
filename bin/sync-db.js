const models = require("../models");
// 객체가 호출될 때 마다 db sync가 실행
module.exports = () => {
  return models.sequelize.sync({ force: true });
};
