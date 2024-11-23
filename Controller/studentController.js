import Subject from "../model/Subject.js";

export const createSubject = async (req, res) => {
  try {
    const { name, code } = req.body;

    // Validate input
    if (!name || !code) {
      return res.status(400).json({ message: "Name and code are required." });
    }

    // Check for existing subject code
    const existingSubject = await Subject.findOne({ code }).lean();
    if (existingSubject) {
      return res.status(400).json({ message: "Subject code already exists." });
    }

    // Create and save subject
    const subject = new Subject({ 
      name,
      code,
      createdBy: req.user.id,
    });

    const savedSubject = await subject.save();
    res.status(201).json({ 
      message: "Subject created successfully.", 
      subject: savedSubject 
    });
  } catch (error) {
    res.status(500).json({ message: `Error creating subject: ${error.message}` });
  }
};

export const getSubjects = async (req, res) => {
  try {
    // Fetch subjects and populate 'createdBy' field
    const subjects = await Subject.find()
      .populate("createdBy", "name email")
      .lean(); // Use lean() to improve read performance

    res.status(200).json({
      message: "Subjects retrieved successfully.",
      subjects,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error retrieving subjects: ${error.message}`,
    });
  }
};
