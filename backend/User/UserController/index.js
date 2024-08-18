const response = require("../../helper/responses");
const services = require("../UserServices");
const auth_services = require("../../authServices");
const transformers = require("../../transformers");
const bcryptjs = require("bcryptjs");

// Helper function to validate email address
const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

const register = async (req, res) => {
    try {
      const { username, password, email, passwordConfirmation } = req.body;
  
      // Validate request data
      if (!username || username.length < 3) {
        return res.status(400).json({ error: 'username must be at least 3 characters long' });
      }
  
      if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
      }
  
      if (!password || password.length < 6) {
        return res.status(400).json({ error: 'password must be at least 6 characters long' });
      }
  
      if (password !== passwordConfirmation) {
        return res.status(400).json({ error: 'passwords do not match' });
      }
  
      const newUser = await services.createUser({
        username,
        password,
        email,
      });
  
      if (!newUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      return res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Server error' });
    }
};

const login = async (req, res) => {
    try {
      const { account, password } = req.body;
  
      if (!account || !password) {
        return response.failedWithMessage("Please fill in the account and password", res);
      }
  
      const user = await services.findUser(account);
      if (!user) {
        return response.failedWithMessage("User not found, please create an account", res);
      }
  
      const isValid = bcryptjs.compareSync(password, user.password);
  
      if (!isValid) {
        return response.failedWithMessage("Incorrect password", res);
      }
  
      const transformedUser = transformers.userTransformer(user);
      const token = auth_services.tokenGenerator({
        id: user.id, // Adjusted to match the model field
        // type: user.UserType, 
      });
  
      return response.successWithMessage("Logged in successfully", res, {
        user: transformedUser,
        token,
      });
    } catch (err) {
      console.error("ERROR --> ", err);
      return res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { login, register };
