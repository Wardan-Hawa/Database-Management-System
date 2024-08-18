const models = require("../models");

const userTransformer = (user) => {
  if (user?.dataValues?.password) {
    delete user.dataValues.password;
  }
  if (user?.UserMeta) {
    user.UserMeta = TransformerUserMetas(user?.UserMeta);
  }
  return user;
};
const TransformerUsers = (Users) => {
  return Users.map((User) => userTransformer(User));
};







module.exports = {
  userTransformer,
  TransformerUsers
};
