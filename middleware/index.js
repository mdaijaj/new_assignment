const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


//login token authrization
exports.login_required = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.verify(token, process.env.Secret|| "aijajkhan");
    req.user = user;
    // console.log(user)
  } else {
    res.status(403).send("authrization requied")
  }
  next();
}