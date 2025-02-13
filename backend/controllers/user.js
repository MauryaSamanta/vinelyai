import User from '../models/User.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// User Signup
export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log(req.body);
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// User Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const addfriend=async(req,res)=>{
  const {userid,friendid}=req.body;
  try {
    const user=await User.findById(userid);
    user.friends.push(friendid);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json('error');
    
  }
}
