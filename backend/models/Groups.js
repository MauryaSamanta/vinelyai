import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // User references
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Group creator/admin
   
  },
  { timestamps: true } // Automatically creates createdAt & updatedAt fields
);

const Group = mongoose.model("Group", groupSchema);

export default Group;
