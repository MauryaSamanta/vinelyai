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
    const user = await User.findOne({ email }).populate('friends');
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

export const getGoogleAuthURL= (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
    process.env.GOOGLE_CLIENT_ID
  }&redirect_uri=${
    process.env.GOOGLE_REDIRECT_URI
  }&response_type=code&scope=profile email&access_type=offline`;
  
  res.json({ url });
}

export const handleGoogleCallback=async (req, res) => {
  const { code } = req.body;
  console.log( process.env.GOOGLE_REDIRECT_URI)
  try {
    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', 
    {body:JSON.stringify({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code'
    }),
    headers:{"Content-Type":"application/json"},
    method:"POST"
  });

  const returneddata0=await tokenResponse.json();

    const { access_token } = returneddata0;
    //console.log(returneddata0);
    // Get user info
    const userInfo = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
      method:"GET"
    });
    //console.log(userInfo);
    const returneddata1=await userInfo.json();
    console.log(returneddata1);
    const { email, given_name,family_name, picture } = returneddata1;
    //console.log(returneddata1);
    // // Find or create user
     let user = await User.findOne({ email }).populate('friends');
    
    if (!user) {
      user = await User.create({
        email,
        firstName:given_name,
        lastName:family_name,
        avatar:picture,
      
      });
    }
    else
    {
      user.firstName=given_name;
      user.lastName=family_name;
      user.avatar=picture;
      await user.save();
    }

    // Generate JWT
    const token = jwt.sign(
      { user },
      process.env.JWT_SECRET,
      
    );

    res.json({
      token,
      user
    });
   // res.json('success');
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.status(500).json({ message: 'Authentication failed' });
  }
}

export const suggestFriends=async(req,res)=>{
  //since we have just a few users and in testing phase, to suggest friends we will show all the users other than the logged in user
  const {userid}=req.body;
  try {
    const user = await User.findById(userid);
    const suggests = await User.find({
      _id: { $ne: userid, $nin: user.friends },
    });// Find all users except the logged-in user
    console.log(suggests);
    res.status(200).json(suggests);

  } catch (error) {
    res.status(500).json({ message: "Error fetching suggested friends", error });
  }
}

export const addfriend=async(req,res)=>{
  const {userid,friendid}=req.body;
  try {
    const user=await User.findById(userid);
    const friend=await User.findById(friendid);
    user.friends.push(friendid);
    friend.friends.push(userid);
    await user.save();
    await friend.save();
    const user_new=await User.findById(userid).populate('friends');
    res.status(200).json(user_new);
  } catch (error) {
    console.log(error);
    res.status(400).json('error');
    
  }
}
