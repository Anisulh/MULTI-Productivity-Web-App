const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateJWT");

// register user
// POST /api/users/register
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  //check if user exists
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(401);
    throw new Error("User already exists");
  }              

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
  });

  // replace id key with _id and add token key with JWT token as value
  let userData = { ...user._doc };
  userData["token"] = generateToken(user.id);
  if ("id" !== "_id") {
    userData["_id"] = userData["id"];
    delete userData["id"];
  }
  res.status(201).json(userData);
});

// login user
// POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check email and password is in req.body
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  //check if password matches
  const user = await User.findOne({ email: email });
  const comparePass = await bcrypt.compare(
    password,
    user ? user.password : "0"
  );
  if (!user || !comparePass) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  // replace id key with _id and add token key with JWT token as value
  let userData = { ...user._doc };
  userData["token"] = generateToken(user.id);
  if ("id" !== "_id") {
    userData["_id"] = userData["id"];
    delete userData["id"];
  }
  res.status(200).json(userData);
});

// update the user
// PUT: /api/users/updateuser
// Authorization needed: has access to req.user
const updateUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(400);
    throw new Error("Not logged in");
  }
  //update user model (setting this to a variable and sending as a reponse
  //                   yields old user info)
  await User.findOneAndUpdate({ id: req.user.id }, req.body);

  //get updated user info
  const user = await User.findOne({ id: req.user.id }).select("-password");

  // replace id key with _id and add token key with JWT token as value
  let updatedUser = { ...user._doc };
  let userData = updatedUser;
  if ("id" !== "_id") {
    userData["_id"] = userData["id"];
    delete userData["id"];
  }
  userData["token"] = generateToken(req.user.id);
  res.status(201).json(await userData);
});


module.exports = {
  registerUser,
  loginUser,
  updateUser,
};
