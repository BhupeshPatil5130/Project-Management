import express from 'express';
import { createUser, getAllAdmins, getAllUsers, getAllTeachers, getAllStudents } from '../Controller/userController.js';
import { createSubject, getSubjects } from '../Controller/studentController.js';
import { isAdmin, isStudent, isTeacher } from '../middleware/Middleware.js';
import { createPractical, enrollInPractical, getPracticals } from '../Controller/practicalController.js';

const router = express.Router();

router.post("/users/create", createUser); 
router.get("/users/get",isAdmin, getAllUsers); 
router.get("/admins/get", isAdmin, getAllAdmins); 
router.get("/teachers/get",isAdmin, getAllTeachers); 
router.get("/students/get",isStudent, getAllStudents); 

router.post("/subject/create", isAdmin, createSubject); 
router.get("/subjects/get", getSubjects); 

router.post("/practicals/create", isTeacher, createPractical); 
router.get("/practicals/get", getPracticals); 
router.post("/practicals/enroll", isStudent, enrollInPractical); 

export default router;
