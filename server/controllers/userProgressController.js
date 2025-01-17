import UserProgress from "../models/UserProgress.js";

export const getUserProgress = async (req, res) => {
  try {
    const userProgress = await UserProgress.findOne({ user: req.params.id });
    if (userProgress) {
      res.json(userProgress);
    } else {
      res.status(404).json({ message: "User Progress not found" });
    }
  } catch (err) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllUserProgress = async (req, res) => {
  try {
    const userProgress = await UserProgress.find({});
    if (userProgress) {
      res.json(userProgress);
    } else {
      res.status(404).json({ message: "User Progress not found" });
    }
  } catch (err) {
    res.status(400).json({ message: error.message });
  }
};

// export const updateUserProgress = async (req, res) => {
//   try {
//     const userProgress = await UserProgress.findOne({ user: req.params.id });
//   } catch (err) {}
// };
