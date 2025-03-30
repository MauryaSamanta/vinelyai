import express from 'express';
import connectDB from './connections/db.js';
import cors from "cors";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import connRoutes from "./routes/connections.js";
import groupRoutes from "./routes/groups.js";
const app = express();

dotenv.config();
// Middleware to parse JSON bodies
app.use(express.json());

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

connectDB();//connecting to db

app.use('/user',userRoutes);
app.use('/connections',connRoutes);
app.use('/groups', groupRoutes);
// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
