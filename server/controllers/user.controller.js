import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res
      .status(200)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isExitingUser = await User.findOne({ email });
    if (!isExitingUser) {
      return res.json({
        success: false,
        message: "User not found! Please try again",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isExitingUser.password
    );
    if (!isPasswordCorrect) {
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });
    }
    const token = jwt.sign(
      {
        id: isExitingUser._id,
        role: isExitingUser.role,
        email: isExitingUser.email,
        userName: isExitingUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Login successful",
      user: {
        email: isExitingUser.email,
        role: isExitingUser.role,
        id: isExitingUser._id,
        userName: isExitingUser.userName,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const logoutUser = (req, res) => {
  res
    .clearCookie("token")
    .json({ success: true, message: "Logout successful" });
};

const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You are not logged in. Please log in to access this page",
    });
  }
  try { 
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    let message = "Invalid token. Please log in again.";

    if (error.name === "TokenExpiredError") {
      message = "Session expired. Please log in again.";
    }
    res.status(403).json({
      success: false,
      message,
    });
  }
};

export { registerUser, loginUser, logoutUser, authMiddleware };
