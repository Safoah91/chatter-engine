const UserModel = require("./../../database/models/users");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
/**
 * @desc Register New User
 * @route POST /auth/register
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, ...rest } = req.body;
  const user = await UserModel.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashPass = await bcrypt.hash(password, 10);
  const newUser = await UserModel.create({
    email,
    password: hashPass,
    ...rest,
  });

  if (newUser) {
    res.status(201).json({ message: "User created successfully" });
  } else {
    res.status(400);
    throw new Error("User not created");
  }
});

/**
 * @desc Login User
 * @route POST /auth/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!email || !password) {
    res.status(401);
    throw new Error("Email and password required");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        user: {
          id: user.id,
          email,
          joinAs: user.joinAs,
        },
      },
      process.env.SECRET_TOKEN,
      { expiresIn: "30d" }
    );

    res.status(200).json({ token });
  } else {
    res.status(400);
    throw new Error("Incorrect email and password");
  }
});

/**
 * @desc Current User Logged in
 * @route POST /auth/current
 * @access Private
 */
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});
module.exports = { registerUser, loginUser, currentUser };
