import User from "../models/User.js";
import UserProgress from "../models/UserProgress.js";
// require("../middleware/userMiddleware");

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single user
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create user
export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createUserProgress = async (req, res) => {
  try {
    const checkUserProgress = await UserProgress.findOne({ user: req.user._id });
    if (!checkUserProgress && user.role === "student") {
      const userProgress = new UserProgress({
        user: req.user._id,
      });
      await userProgress.save();
      console.log("UserProgress document created:", userProgress);
    }
  } catch (err) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserProgress = async (req, res) => {
  try{
    const userId = new mongoose.Types.ObjectId(req.params.id)
    const userProgress = await UserProgress.findOne({ user : userId });
    if (userProgress) {
      res.json(userProgress);
    } else {
      res.status(404).json({ message: "User Progress not found" });
    };
  } catch (err) {
    res.status(400).json({ message: error.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      Object.assign(user, req.body);
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      res.json({ message: "User removed" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
