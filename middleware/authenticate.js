const jwt = require("jsonwebtoken");
const User = require("../model/userschema");
const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const verifytoken = jwt.verify(token, process.env.SECRET_KEY);

    const rootuser = await User.findOne({
      _id: verifytoken._id,
      "tokens.token": token,
    });
    if (!rootuser) {
      throw new Error("user not found");
    }
    req.token = token;
    req.rootuser = rootuser;
    req.userID = rootuser._id;

    next();
  } catch (err) {
    res.status(401).send("unauthorised:NO Token Provided");
    console.log(err);
  }
};

module.exports = authenticate;
