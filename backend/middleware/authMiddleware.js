// ✅ Authentication Middleware - Validates JWT tokens

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "No token provided. Please log in." });
  }

  try {
    // TODO: Verify JWT token (requires jwt library)
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = decoded;
    
    // Placeholder: In production, validate the token with jwt.verify()
    req.user = { token }; // Temporary - replace with actual JWT verification
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
