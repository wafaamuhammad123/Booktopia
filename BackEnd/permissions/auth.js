const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  var token = req.headers.authorization;
  // console.log(token)
  if (!token){
    console.log("not logged in")
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    var decodedPayload = jwt.verify(token, "thistokensecret");
    req.user = decodedPayload;
    console.log("auth")
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
    console.log("not auth")
  }
};
