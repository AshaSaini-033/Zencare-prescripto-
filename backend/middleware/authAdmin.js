import jwt from 'jsonwebtoken'
const authAdmin = async (req, res, next) => {
  try {
    // 1. Check for the standard Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: "Authentication failed: No token provided." });
    }

    // 2. Extract the token from "Bearer <token>"
    const token = authHeader.split(' ')[1];

    // Verify the token and extract the payload
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if the decoded token contains admin email
    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ success: false, message: "Not authorized - invalid token" });
    }
    
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Not authorized - token verification failed" });
  }
};
export default authAdmin