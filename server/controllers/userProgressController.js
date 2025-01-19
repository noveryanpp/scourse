import UserProgress from "../models/UserProgress.js";
import Item from "../models/Item.js";
import Course from "../models/Course.js";
import axios from "axios"
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("../.env") });

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
    const userProgress = await UserProgress.findOne({ user: req.user._id });
    const course = await Course.findById(req.params.id);
    let valid = false;
    let updateQuery = { $push: { courses: { courseId: course._id } } };

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.enrolledStudents.includes(req.user._id)) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

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
        const updatedCourse = await Course.findByIdAndUpdate(
          course._id,
          {
            $push: { enrolledStudents: req.user._id },
          },
          { new: true }
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

// export const updateCourseProgress = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.courseId);
//     const userProgress = await UserProgress.findOne({ user: req.user._id });

//     if (!course.enrolledStudents.includes(req.user._id)) {
//       return res.status(400).json({ message: "You're not enrolled in this course" });
//     }

//     const update = await UserProgress.updateOne(
//       { _id: userProgress._id, "courses.courseId": course._id },
//       {
//         $set: {
//           "courses.$.lastSection": req.body.lastSection,
//         },
//       }
//     );

//     if (req.body.lastSection == course.sections.length && userProgress) {
//       const addCoins = await axios.post(`${process.env.API_URL}/api/progress/${req.user._id}/additem/678a78c3a539e9c70fea9b50`, { // hex = scoin itemId
//         headers: {
//           "Content-Type": "application/json",
//           "x-api-key": process.env.API_KEY,
//         },
//         data: {
//           amount: course.rewards.scoin,
//         },
//       });
//       const addScores = await axios.post(`${process.env.API_URL}/api/progress/${req.user._id}/addscores/${course.rewards.score}`, {
//         headers: {
//           "x-api-key": process.env.API_KEY,
//         }
//       });
//     }
//   } catch (error) {}
// };

export const updateCourseProgress = async (req, res) => {
  try {
    // Find the userProgress document
    const userProgress = await UserProgress.findOne({ user: req.user._id });
    let msg = "";

    if (!userProgress) {
      res.json({ message: "User progress not found"});
      return;
    }

    // Find the course in the userProgress
    const course = userProgress.courses.find(course => course.courseId.toString() === req.params.courseId.toString());

    if (!course) {
      res.status(400).json({ message: "You're not enrolled in this course"});
      return;
    }

    // Increment the lastSection
    if(!course.isFinished){
      course.lastSection += 1;
      
      // Check if the course is finished
      const courseDetails = await Course.findById(req.params.courseId);

      if (!courseDetails) {
        res.status(400).json({ message: "Course not found"});
        return;
      }

      if (course.lastSection >= courseDetails.sections.length) { // checking if the lastSection has reached the end of the course section
        // Give rewards to user
        const addCoins =await axios({
          method: "post",
          url: `${process.env.API_URL}/api/progress/${req.user._id}/additem/678a78c3a539e9c70fea9b50`,  // hex = scoin itemId
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.API_KEY,
          },
          data: {
            amount: courseDetails.rewards.scoin,
          },
        });
        const addScores = await axios({
          method: "post",
          url: `${process.env.API_URL}/api/progress/${req.user._id}/addscores/${courseDetails.rewards.score}`, 
          headers: {
            "x-api-key": process.env.API_KEY,
          }
        });
        // Mark the course as finished
        course.isFinished = true; 

        msg = "Course completed! Rewards given.";
      } else {
        msg ="Section completed!";
      }

      // Save the updated user progress
      await userProgress.save();
    }
    res.status(200).json({ message : msg});
  } catch (error) {
    res.status(500).json({ message: `Error finishing section: ${error}`});
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
      updateQuery = { $push: { items: item._id } };
    } else if (item.category === "avatar") {
      updateQuery = { $push: { avatars: item._id } };
    } else {
      if (item.name === "Scoin") {
        updateQuery = { $inc: { scoins: amount } };
      } else {
        updateQuery = { $inc: { scashes: amount } };
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
    const userProgress = await UserProgress.findOneAndUpdate(
      { user: req.params.userId },
      { $inc: { scores: req.params.amount } },
      { new: true }
    );
    res.json({ message: "Success adding Scores" });
  } catch (err) {
    res.status(400).json({ message: error.message });
  }
};
