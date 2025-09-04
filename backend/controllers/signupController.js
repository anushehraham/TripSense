import Signup from '../models/Signup.js';

// Create a new user signup
export const createSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      });
    }

    // Check if user already exists
    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create new user
    const newUser = new Signup({
      name,
      email,
      password
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        createdAt: savedUser.createdAt
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during signup',
      error: error.message
    });
  }
};

// Get all signups (for admin purposes)
export const getAllSignups = async (req, res) => {
  try {
    const signups = await Signup.find({})
      .select('-password') // Exclude password from response
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: signups.length,
      data: signups
    });

  } catch (error) {
    console.error('Get signups error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching signups',
      error: error.message
    });
  }
};

// Get signup by ID
export const getSignupById = async (req, res) => {
  try {
    const { id } = req.params;
    const signup = await Signup.findById(id).select('-password');

    if (!signup) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: signup
    });

  } catch (error) {
    console.error('Get signup by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user by email
    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password (simple comparison for now - in production, use bcrypt)
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Return user data (excluding password)
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login',
      error: error.message
    });
  }
};
