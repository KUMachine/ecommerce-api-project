import jwt from "jsonwebtoken";

// Middleware to check if the user is authenticated
export function isAuth(req, res, next) {
  // get the token from the header
  const token = req.headers.authorization;
  try {
    // verify the token
    const user = jwt.verify(token, process.env.JWT_KEY);
    req.user = user;
  } catch (error) {
    // if the token is not valid, send a 401 response
    return res.status(401).json({ error: "not authorized!" });
  }
  // if the token is valid, access the route
  next();
}

// Middleware to check if the user is admin
export function isAdmin(req, res, next) {
  // get the token from the header
  const token = req.headers.authorization;
  try {
    // verify the token
    const user = jwt.verify(token, process.env.JWT_KEY);
    // check if the user is admin
    if (!user.isAdmin) {
      // if the user is not admin, send a 401 response
      return res.status(401).json({ error: "you are not admin" });
    }
    req.user = user;
  } catch (error) {
    // if the token is not valid, send a 401 response
    return res.status(401).json({ error: "not authorized!" });
  }
  // if the token is valid, access the route
  next();
}
