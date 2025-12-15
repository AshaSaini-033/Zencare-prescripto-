import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
  try {
    // 1. Check for the standard Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: "Authentication failed: No token provided." });
    }

    // 2. Extract the token from "Bearer <token>"
    const token = authHeader.split(' ')[1];

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", token_decode);

    // 3. Ensure the role is 'user' for this middleware
    if (token_decode.role !== 'user') {
      return res.status(403).json({ success: false, message: "Forbidden: Access is restricted to users." });
    }

    req.userId = token_decode.id; // safe jagah
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Not authorized - token verification failed" });
  }
};
export default authUser;