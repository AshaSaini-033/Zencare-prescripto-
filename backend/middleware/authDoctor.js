import jwt from 'jsonwebtoken'

const authDoctor = async (req, res, next) => {
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

    // 3. You can add a role check here too if needed

    req.doctorId = token_decode.id; // safe jagah
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Not authorized - token verification failed" });
  }
};
export default authDoctor;