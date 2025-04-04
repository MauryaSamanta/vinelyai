import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String },
  number_con: { type: String },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  avatar: { type: String }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
