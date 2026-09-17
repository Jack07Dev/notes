const userModel = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRegisteration = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const isUser = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email and password are required",
      });
    }

    if (isUser) {
      return res.status(409).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Create user
    const user = await userModel.create({
      username,
      email,
      password: hash,
    });

    // Create JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.cookie("token", token);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
      },
    });
  } catch (error) {
    next();
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Find user by username OR email
    const user = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    // User not found
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credential",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credential",
      });
    }

    // Create JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Store JWT in cookie
    res.cookie("token", token);
    res.status(200).json({
      message: "Loggin successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
      },
    });
  } catch (error) {
    next(error);
  }
};

const userLogout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful!",
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
    try{
        const user = await userModel.findById(req.user.id).select("-password -resetPasswordToken -resetPasswordExpires");
    
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user
        });
    }catch(error){
        next(error);
    }
};

const updateProfile = async (req, res, next) => {
  try {
    const { username, bio, profileImage } = req.body;

    const user = await userModel.findByIdAndUpdate(
      req.user.id,
      {
        username,
        bio,
        profileImage,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password -resetPasswordToken -resetPasswordExpires");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { userRegisteration, userLogin, userLogout, getCurrentUser, updateProfile };
