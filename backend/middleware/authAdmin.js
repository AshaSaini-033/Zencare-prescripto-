import jwt from 'jsonwebtoken'
const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    
    if (!atoken) {
      return res.json({ success: false, message: "Not authorized - no token provided" });
    }
    //console.log(atoken)
    // Verify the token and extract the payload
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
    
    // Check if the decoded token contains admin email
    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: "Not authorized - invalid token" });
    }
    
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Not authorized - token verification failed" });
  }
};
export default authAdmin