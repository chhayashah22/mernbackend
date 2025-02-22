import User from '../models/userRegistermodel.js';
import bcrypt from 'bcryptjs';
import jwt, { decode } from 'jsonwebtoken';

// Generate a unique referral code
const generateReferralCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// User Registration
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Generate referral code and hash password
    const referralCode = generateReferralCode();
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({ name, email, password: hashedPassword, referralCode });

    await newUser.save();
    res.status(201).json({ success: true, newUser });

  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

// User Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;  // ✅ Find user by email instead of name

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if user exists by email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ success: false, message: "Invalid Email" });
    }

    // Check if password matches
    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, message: "Incorrect Password" });
    }

    // Generate Token
    const token = jwt.sign(
      { id: existingUser._id, name: existingUser.name, email: existingUser.email },  // ✅ Include email in the token
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
    );

    console.log("Generated Token Payload:", jwt.decode(token)); // ✅ Debugging

    // Send token in response
    return res.status(200).json({ success: true, name: existingUser.name, id: existingUser._id, token });

  } catch (error) {
    console.error("Error in login user controller:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get User Details (for dashboard)
