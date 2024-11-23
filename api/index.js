import express from 'express';

// import User from '../model/User.js';
import dotenv from 'dotenv';
import dbconnect from '../config/database.js';
import router from '../routes/PraticalManagent.js';
import cors from 'cors';

const app =express();

const PORT=5000 ||process.env.PORT;
app.use(express.json());
app.use("/api/v1",router);
dotenv.config();
app.use(cors()); 
dbconnect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

app.get("/", (req, res) => {
  res.send("Hello World!");
}
)
