import mongoose from "mongoose";
const ConnectionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  firstName: { type: String },
  lastName: { type: String },
  company: { type: String  },
  position: { type: String },
  url:{type:String},
  embedding: { type: [Number], required: true}, 
});

const Connection = mongoose.model("Connection", ConnectionSchema);
 export default Connection;