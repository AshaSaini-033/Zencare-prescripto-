import jwt from 'jsonwebtoken'

const authDoctor = async (req, res, next) => {
  try {
    const {dtoken }= req.headers;
    console.log('dtoken:', dtoken);
    if (!dtoken) {
      return res.json({ success: false, message: "Not authorized - no token provided" });
    }

    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
    console.log("Decoded token:", token_decode);

    req.doctorId = token_decode.id; // safe jagah
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Not authorized - token verification failed" });
  }
};
export default authDoctor;