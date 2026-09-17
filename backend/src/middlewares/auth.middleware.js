const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authUser = async (req, res, next) => {
  try {
    // Get JWT from HTTP-only cookie
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login.",
      });
    }
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Store decoded user information
    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authUser };
