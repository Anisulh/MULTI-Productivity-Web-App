const jwt = require("jsonwebtoken");

//generate JWT token using user id
const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET);
};


module.exports = generateToken