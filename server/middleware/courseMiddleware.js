import Course from "../models/Course.js";

export const isEnrolled = async (req, res, next) => {
  const course = await Course.findById(req.params.id).select(
    "enrolledStudents"
  );

  if (course.enrolledStudents.includes(req.user._id)) {
    console.log("ok");
    return res.status(200).json({ message: "You're enrolled in this course" });
    next();
  } else {
    return res
      .status(200)
      .json({ message: "You're not enrolled in this course" });
    next();
  }
};
