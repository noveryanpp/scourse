import UserProgress from "../models/UserProgress.js";
import Item from "../models/Item.js";
import Course from "../models/Course.js";

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
    const userProgress = await UserProgress.findOne({ user: req.params.id});
    if (userProgress) {
      res.json(userProgress);
    } else {
      res.status(404).json({ message: "User Progress not found" });
    }
  } catch (err) {
    res.status(400).json({ message: error.message });
  }
};

export const purchaseItem = async (req, res) => {
  try {
    const userProgress = await UserProgress.findOne({ user: req.params.userId });
    const item = await Item.findById(req.params.itemId);
    let valid = false;
    let updateQuery = {};

    // Check user's balance
    if (item.price.currency === "Scoin") {
      valid = userProgress.scoins >= item.price.amount;
      updateQuery = { $inc: { scoins: -item.price.amount } };
    } else if (item.price.currency === "Scash") {
      valid = userProgress.scashes >= item.price.amount;
      updateQuery = { $inc: { scashes: -item.price.amount } };
    }

    if (valid) {
      // check item category
      if (item.category === "booster") {
        updateQuery.$push = { items: item._id };
      } else if (item.category === "avatar") {
        updateQuery.$push = { avatars: item._id };
      }

      // update userProgress document
      try {
        const updatedUserProgress = await UserProgress.findByIdAndUpdate(
          userProgress._id, // Find the userProgress document
          updateQuery, // Push the new item into the userProgress document and decrement userProgress balance
          { new: true } // Return the updated document
        );
        res.json({ message: "Item Purchased" });
      } catch (err) {
        res.status(400).json({ message: error.message });
      }
    } else {
      res.json({ message: `You don't have enough ${item.price.currency}` });
    }
  } catch (err) {
    res.status(400).json({ message: error.message });
  }
};

export const purchaseCourse = async (req, res) => {
  try {
    const userProgress = await UserProgress.findOne({ user: req.params.userId });
    const course = await Course.findById(req.params.itemId);
    let valid = false;
    let updateQuery = { $push: { courses: { courseId: course._id } } };

    // Check user's balance
    if (course.price.currency === "Scoin") {
      valid = userProgress.scoins >= course.price.amount;
      updateQuery.$inc = { scoins: -course.price.amount };
    } else if (course.price.currency === "Scash") {
      valid = userProgress.scashes >= course.price.amount;
      updateQuery.$inc = { scashes: -course.price.amount };
    } else if (course.price.currency === "Free") {
      valid = true;
    }

    if (valid) {
      // update userProgress document
      try {
        const updatedUserProgress = await UserProgress.findByIdAndUpdate(
          userProgress._id, // Find the userProgress document
          updateQuery, // Push the new course into the userProgress document and decrement userProgress balance
          { new: true } // Return the updated document
        );
        res.json({ message: "Course Purchased" });
      } catch (err) {
        res.status(400).json({ message: error.message });
      }
    } else {
      res.json({ message: `You don't have enough ${course.price.currency}` });
    }
  } catch (err) {
    res.status(400).json({ message: error.message });
  }
};

export const addItem = async (req, res) => {
  try {
    const userProgress = await UserProgress.findOne({ user: req.params.userId });
    const item = await Item.findById(req.params.itemId);
    const amount = req.body.amount;
    let updateQuery = {};

    // check item category
    if (item.category === "booster") {
      updateQuery = { $push: { items: item._id }};
    } else if (item.category === "avatar") {
      updateQuery = { $push: { avatars: item._id }};
    } else {
      if(item.name === "Scoin"){
        updateQuery = { $inc: { scoins: amount }};
      } else {
        updateQuery = { $inc: { scashes: amount }};
      }
    }

    // update userProgress document
    try {
      const updatedUserProgress = await UserProgress.findByIdAndUpdate(
        userProgress._id, // Find the userProgress document
        updateQuery, // Push the new item into the userProgress document
        { new: true } // Return the updated document
      );
      res.json({ message: "Item Added to Inventory" });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const addScores = async (req, res) => {
  try {
    const userProgress = await UserProgress.findOneAndUpdate({ user: req.params.userId }, { $inc: { scores: req.params.amount } }, { new: true });
    res.json({ message: "Success adding Scores" });
  } catch (err) {
    res.status(400).json({ message: error.message });
  }
};

// export const updateUserProgress = async (req, res) => {
//   try {
//     const userProgress = await UserProgress.findOne({ user: req.params.id });
//   } catch (err) {}
// };
