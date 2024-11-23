import User from '../model/User.js';

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = new User({
      name,
      email,
      password,
      role,
    });

    const savedUser = await user.save();

    res.status(201).json({
      message: "User created successfully.",
      user: savedUser,
    });
  } catch (error) {
    res.status(500).json({ message: `Error creating user: ${error.message}` });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().lean();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: `Error fetching users: ${error.message}` });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).lean();
    res.status(200).json({ admins });
  } catch (error) {
    res.status(500).json({ message: `Error fetching admins: ${error.message}` });
  }
};

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" }).lean();
    res.status(200).json({ teachers });
  } catch (error) {
    res.status(500).json({ message: `Error fetching teachers: ${error.message}` });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).lean();
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ message: `Error fetching students: ${error.message}` });
  }
};
