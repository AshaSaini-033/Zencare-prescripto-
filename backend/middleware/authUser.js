import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, message: "Not authorized - no token provided" });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", token_decode);

    req.userId = token_decode.id; // safe jagah
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Not authorized - token verification failed" });
  }
};
export default authUser;