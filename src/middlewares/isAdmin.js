const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  // Extract the token from the request headers or wherever it is stored
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader) {
    // Split the header into two parts: "Bearer" and the actual token
    const parts = authorizationHeader.split(" ");

    if (parts.length === 2 && parts[0] === "Bearer") {
      const token = parts[1];
      // Verify and decode the token
      jwt.verify(token, process.env.JWT_KEY_SECRET, (err, decoded) => {
        if (err) {
          // Token verification failed, send forbidden response
          return res.status(403).json({
            success: false,
            message: "Access forbidden. Invalid token.",
          });
        }

        // Check if the user has the "admin" role
        if (decoded && decoded.role === "client") {
          req.user = decoded;
          next();
        } else {
          // User is not an admin, send a forbidden response
          return res.status(403).json({
            success: false,
            message: "Access forbidden. Admin privileges required.",
          });
        }
      });
    } else {
      // Invalid Authorization header format
      console.log("Invalid Authorization header format");
    }
  } else {
    // No Authorization header provided
    console.log("No Authorization header provided");
  }
};

module.exports = isAdmin;
