const jwt = require("jsonwebtoken");

module.exports.authenticateJWT = (req, res, next) => {
  const jwtSceret = "SECRET";

  const authHeader = decodeURI(req.headers.cookie)
    .toString()
    .substr(req.headers.cookie.toString().indexOf(" ") + 14);
  console.log(authHeader);
  if (authHeader) {
    jwt.verify(authHeader, jwtSceret, (err, user) => {
      console.log({ user, err });
      if (err) {
        return res.status(403).redirect("/");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).redirect("/");
  }
};
