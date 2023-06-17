var jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  var token = req.headers.authorization;
  if (!token) return res.status(401).send("login first please...");

  var decodedPayload = jwt.verify(token, "thistokensecret");
  if (decodedPayload.userType === "admin") {
    next(); //isAdmin
  } else {
    console.log(decodedPayload.userType);
    res.status(401).send("You are not an admin");
  }
};