import User from "../models/User.js";
import UserProgress from "../models/UserProgress.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

// Generate JWT
const generateToken = (id) => {
  const JWT_SECRET = process.env.JWT_SECRET || "scourse_secret_key_2024";
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Register user
export const register = async (req, res) => {
  try {
    const { username, email, password, fullName, role } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      fullName,
      role: role || "student",
    });

    if (user) {
      const userProgress = new UserProgress({
        user: user._id,
        courses: [],
      });
      await userProgress.save();
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.name,
        role: user.role,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login user
export const login = async (req, res) => {
  const { credential, password } = req.body;
  const isEmail = (str) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(str).toLowerCase());
  };

  try {
    //Cek email user
    let user = "";
    if (isEmail(credential)) {
      user = await User.findOne({ email: credential });
    } else {
      user = await User.findOne({ username: credential });
    }

    if (!user) {
      return res.status(400).json({ msg: "Invalid email", cek: user });
    }

    if (await bcrypt.compare(password, user.password)) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all users (admin only)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user role (admin only)
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    // Validate role
    if (!["student", "instructor", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete user (admin only)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent deleting admin users
    if (user.role === "admin") {
      return res.status(400).json({ message: "Cannot delete admin user" });
    }

    await user.deleteOne();
    res.json({ message: "User removed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { username, email, fullName, password } = req.body;

    // Check if email/username already exists
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already exists" });
      }
      user.email = email;
    }

    if (username && username !== user.username) {
      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        return res.status(400).json({ message: "Username already exists" });
      }
      user.username = username;
    }

    if (fullName) {
      user.fullName = fullName;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
