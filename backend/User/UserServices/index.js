const { Op } = require('sequelize');
const { hashPassword } = require('../../authServices');
const { User } = require('../../models');

const createUser = async ({ username, email, password }) => {
  try {
    // Make sure the properties match the model definition
    const newUser = await User.create({
      username,
      email,
      password: hashPassword(password), // Ensure this is hashed if necessary
      
    });

    return newUser;
  } catch (err) {
    console.error('ERROR FROM SERVICE-->', err);
    throw err;
  }
};

const findUser = async (email) => {
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username: email }]
        // removed deletedAt condition as it's not in your model.
      }
    });

    if (user) {
      console.log('User found:', user.toJSON()); // User details
    } else {
      console.log('User not found for email:', email);
    }

    return user; // Returns found user or null
  } catch (err) {
    console.error('ERROR FROM SERVICE:', err);
    throw err;
  }
};

module.exports = {
  createUser,
  findUser,
  // findUserByUsername (commented out as before)
};
