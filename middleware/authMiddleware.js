import jwt from "jsonwebtoken"


const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // Retrieve token from cookie
  if (!token) {
    return res.render("login",{error:"Authorization token missing"});
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request
    next();
  } catch (error) {
    return res.render("login",{error:"Authorization token expired please login again"});
  }
};

export default authMiddleware;