import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//@description Auth and get token
//@route POST api/users/login
//@access PUBLIC
const authUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const payload = {
        id: user.id,
        name: user.name,
      };

      const token = generateToken(payload);

      res.json({
        success: true,
        data: {
          id: user.id,
          name: user.name,
          token: `Bearer ${token}`,
        },
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Incorrect username or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

//@description Register a new user
//@route POST api/users/register
//@access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "Email account is already in use!" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      const payload = {
        id: user.id,
        name: user.name,
      };
      const token = generateToken(payload);

      return res.status(201).json({
        success: true,
        data: {
          id: user.id,
          name: user.name,
          token: `Bearer ${token}`,
        },
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user data!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export { authUser, registerUser };
