import mongoose from "mongoose";
import Course from "../models/Course.js";
import { uploadToCloudinary } from "../services/cloudinary.js"

// export const getCourses = async (req, res) => {
//   try {
//     const courses = await Course.find({})
//       .populate('instructor', 'username fullName')
//       .select('-reviews')
//     res.json(courses)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// }

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.aggregate([
      {
        $addFields: { length: { $size: "$sections" } },
      },
      {
        $unset: ["sections", "reviews"],
      },
      {
        $lookup: {
          from: "users",
          localField: "instructor",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 1,
                fullName: 1,
              },
            },
          ],
          as: "instructor",
        },
      },
      {
        $unwind: "$instructor",
      },
    ]);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserCourses = async (req, res) => {
  let courses = "";
  try {
    if (req.user._id.toString() === req.params.userId.toString()) {
      // Check if the requested id is this user id
      if (req.user.role === "instructor" || req.user.role === "admin") {
        // Check if user is an instructor or admin, if so returning all details of this user courses
        courses = await Course.aggregate([
          {
            $match: {
              instructor: new mongoose.Types.ObjectId(req.params.userId),
            },
          },
        ]);
      } else {
        // If user is a student, returning only necessary field of this user enrolled courses
        courses = await Course.aggregate([
          {
            $match: {
              $expr: { $in: [new mongoose.Types.ObjectId(req.user.id), "$enrolledStudents"] },
            },
          },
          {
            $addFields: { length: { $size: "$sections" } },
          },
          {
            $unset: ["sections", "reviews"],
          },
          {
            $lookup: {
              from: "users",
              localField: "instructor",
              foreignField: "_id",
              pipeline: [
                {
                  $project: {
                    _id: 1,
                    fullName: 1,
                  },
                },
              ],
              as: "instructor",
            },
          },
          {
            $unwind: "$instructor",
          },
        ]);
      }
    } else {
      // Fetch instructor's courses
      courses = await Course.aggregate([
        {
          $match: {
            instructor: new mongoose.Types.ObjectId(req.params.userId),
          },
        },
        {
          $addFields: { length: { $size: "$sections" } },
        },
        {
          $unset: ["sections", "reviews"],
        },
        {
          $lookup: {
            from: "users",
            localField: "instructor",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  _id: 1,
                  fullName: 1,
                },
              },
            ],
            as: "instructor",
          },
        },
        {
          $unwind: "$instructor",
        },
      ]);
    }
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $addFields: { 
          length: { $size: "$sections" },
          sectionsList: {
            $map: {
              input: "$sections",
              as: "section",
              in: {
                title: "$$section.title",
              }
            }
          }
        },
      },
      {
        $unset: ["sections"],
      },
      {
        $lookup: {
          from: "users",
          localField: "instructor",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 1,
                fullName: 1,
              },
            },
          ],
          as: "instructor",
        },
      },
      {
        $unwind: "$instructor",
      },
    ]);

    res.json(course[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const getCourseById = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id)
//       .populate("instructor", "username fullName")
//       .populate("reviews.user", "username fullName")
//       .populate("enrolledStudents", "username fullName");

//     if (course) {
//       res.json(course);
//     } else {
//       res.status(404).json({ message: "Course not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const createCourse = async (req, res) => {
  try {
    let imageData = {}
    if(req.body.thumbnailImage){
        const results = await uploadToCloudinary(req.body.thumbnailImage, "scourse")
        imageData = results;
    }
    const course = new Course({
      ...req.body,
      thumbnail: imageData,
      instructor: req.user._id,
    });
    const newCourse = await course.save();

    const populatedCourse = await Course.findById(newCourse._id).populate("instructor", "username fullName");

    res.status(201).json(populatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    let imageData = {}
    if(req.body.thumbnailImage){
        const results = await uploadToCloudinary(req.body.thumbnailImage, "scourse")
        imageData = results;
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, { ...req.body, thumbnail: imageData }, { new: true }).populate("instructor", "username fullName");

    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await course.deleteOne();
    res.json({ message: "Course removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.enrolledStudents.includes(req.user._id)) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    course.enrolledStudents.push(req.user._id);
    await course.save();

    res.json({ message: "Successfully enrolled in course" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// export const checkUserCourse = async (req, res) => {
//   try{
//     const course = await Course.findById(req.params.id);
//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     if (course.enrolledStudents.includes(req.user._id)) {
//       return res.json({ message: ""})
//     }
//   }
// };

export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (!course.enrolledStudents.includes(req.user._id)) {
      return res.status(403).json({ message: "Must be enrolled to review" });
    }

    const alreadyReviewed = course.reviews.find((review) => review.user.toString() === req.user._id.toString());

    if (alreadyReviewed) {
      return res.status(400).json({ message: "Course already reviewed" });
    }

    const review = {
      user: req.user._id,
      rating: Number(rating),
      comment,
    };

    course.reviews.push(review);
    course.rating.count = course.reviews.length;
    course.rating.average = course.reviews.reduce((acc, item) => item.rating + acc, 0) / course.reviews.length;

    await course.save();

    const updatedCourse = await Course.findById(req.params.id).populate("instructor", "username fullName").populate("reviews.user", "username fullName");

    res.status(201).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const review = course.reviews.find((review) => review.user.toString() === req.user._id.toString());

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.rating = Number(rating);
    review.comment = comment;

    course.rating.average = course.reviews.reduce((acc, item) => item.rating + acc, 0) / course.reviews.length;

    await course.save();

    const updatedCourse = await Course.findById(req.params.id).populate("instructor", "username fullName").populate("reviews.user", "username fullName");

    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.reviews = course.reviews.filter((review) => review.user.toString() !== req.user._id.toString());

    if (course.reviews.length === 0) {
      course.rating.average = 0;
      course.rating.count = 0;
    } else {
      course.rating.count = course.reviews.length;
      course.rating.average = course.reviews.reduce((acc, item) => item.rating + acc, 0) / course.reviews.length;
    }

    await course.save();
    res.json({ message: "Review removed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addLesson = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { title, description, videoUrl, duration } = req.body;

    const maxOrder = course.lessons.length > 0 ? Math.max(...course.lessons.map((l) => l.order)) : 0;

    course.lessons.push({
      title,
      description,
      videoUrl,
      duration,
      order: maxOrder + 1,
    });

    await course.save();
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCourseSection = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const isEnrolled = course.enrolledStudents.includes(req.user._id);
    const isInstructor = course.instructor.toString() == req.user._id.toString();

    if (!isEnrolled && !isInstructor) {
      return res.status(403).json({ message: "Must be enrolled to view section" });
    }

    const sectionsLength = course.sections.length;
    let sectionData;
    if (req.params.sectionId == null) {
      sectionData = course.sections;
    } else {
      sectionData = course.sections[req.params.sectionId - 1];
    }

    const section = { sectionData, sectionsLength };

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.json(section);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateLesson = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const lesson = course.lessons.id(req.params.lessonId);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    const { title, description, videoUrl, duration } = req.body;

    lesson.title = title || lesson.title;
    lesson.description = description || lesson.description;
    lesson.videoUrl = videoUrl || lesson.videoUrl;
    lesson.duration = duration || lesson.duration;

    await course.save();
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteLesson = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    course.lessons = course.lessons.filter((lesson) => lesson._id.toString() !== req.params.lessonId);

    course.lessons = course.lessons.map((lesson, index) => {
      lesson.order = index + 1;
      return lesson;
    });

    await course.save();
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const reorderLessons = async (req, res) => {
  try {
    const { lessonOrder } = req.body;

    const result = await Course.updateOne(
      { _id: req.params.id },
      {
        $set: {
          "lessons.$[].order": 0,
        },
      }
    );

    for (let i = 0; i < lessonOrder.length; i++) {
      await Course.updateOne(
        {
          _id: req.params.id,
          "lessons._id": lessonOrder[i],
        },
        {
          $set: {
            "lessons.$.order": i + 1,
          },
        }
      );
    }

    const updatedCourse = await Course.findById(req.params.id).populate("instructor", "username fullName");

    res.json(updatedCourse);
  } catch (error) {
    console.error("Reorder error:", error);
    res.status(400).json({ message: error.message });
  }
};
