import Practical from "../model/Practical.js";

export const createPractical = async (req, res) => {
  try {
    const { subjectId, title, description } = req.body;

    if (!subjectId || !title || !description) {
      return res.status(400).json({ message: "All fields (Subject ID, title, description) are mandatory." });
    }

    const newPractical = new Practical({
      subjectId,
      title,
      description,
      createdBy: req.user.id,
    });

    const savedPractical = await newPractical.save();

    res.status(201).json({
      message: "Practical has been successfully created.",
      practical: savedPractical,
    });
  } catch (error) {
    res.status(500).json({ message: `Failed to create practical: ${error.message}` });
  }
};

export const getPracticals = async (req, res) => {
  try {
    const practicals = await Practical.find()
      .populate("subjectId", "name code")
      .populate("createdBy", "name email role")
      .populate("enrolledStudents", "name email")
      .lean();

    res.status(200).json({
      message: "Successfully retrieved practicals.",
      practicals,
    });
  } catch (error) {
    res.status(500).json({ message: `Failed to retrieve practicals: ${error.message}` });
  }
};

export const enrollInPractical = async (req, res) => {
  try {
    const { practicalId } = req.body;

    if (!practicalId) {
      return res.status(400).json({ message: "Practical ID is required for enrollment." });
    }

    const updatedPractical = await Practical.findByIdAndUpdate(
      practicalId,
      { $addToSet: { enrolledStudents: req.user.id } },
      { new: true }
    )
      .populate("subjectId", "name code")
      .populate("enrolledStudents", "name email")
      .lean();

    if (!updatedPractical) {
      return res.status(404).json({ message: "Practical not found." });
    }

    res.status(200).json({
      message: "Enrollment successful.",
      practical: updatedPractical,
    });
  } catch (error) {
    res.status(500).json({ message: `Failed to enroll in practical: ${error.message}` });
  }
};

