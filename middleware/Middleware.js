 import userModel from "../model/User.js";
 
 
 
 
 export const isAdmin =async (req,res,next)=>{
   
   try {
        const{email}=req.body;
       const userInfo= await userModel.findOne({email});

       if(userInfo && userInfo.role == 'Admin'){
            next();
       }else{
        res.status(403).json({
            message:"Access Denied,Only Admin can  access this"
        })
       }
        
    } catch (error) {
        res.status(500).json({
            message:`Error is ${error}`,
        })
    }


 }
 export const isTeacher = (req, res, next) => {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied. Only teachers are allowed." });
    }
    next();
  };
  
  export const isStudent = (req, res, next) => {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Access denied. Only students are allowed." });
    }
    next();
  };
 