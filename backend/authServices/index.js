const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require('../models');

const hashPassword = (password) => bcryptjs.hashSync(password, 10);
const checkPassword = (password, hashedpassword) =>
  bcryptjs.compareSync(password, hashedpassword);
const tokenGenerator = (data, expiresIn = "10h") =>
  jwt.sign(data, process.env.SECRET_KEY, { expiresIn });

const decodeToken = (token) => {
  if (!token) return null;
  return jwt.verify(token, process.env.SECRET_KEY);
};



const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'YOUR_SECRET_KEY');
        const user = await User.findByPk(decoded.id);

        if (!user) {
            throw new Error('User not found');
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};


module.exports = {
  hashPassword,
  checkPassword,
  tokenGenerator,
  decodeToken,
  authenticate
};