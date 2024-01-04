const isAuthenticated = (req, res, next) => {
  // Check if the user is authenticated based on the presence of a token
  const authorizationHeader = req.headers.authorization;
  const parts = authorizationHeader.split(" ");
  if (parts.length === 2 && parts[0] === "Bearer") {
    const token = parts[1];
    if (!token) {
      // Token not provided
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Token not provided.",
      });
    }
      try {
      // Check if the decoded token's fullname matches the one saved in the session
      if (token === req.session.token) {
        // User is authenticated
        return next();
      } else {
        // Token does not match the session fullname
        return res.status(401).json({
          success: false,
          message: "Unauthorized. Token does not match user session.",
        });
      }
    } catch (error) {
      // Token verification failed
      return res.status(403).json({
        success: false,
        message: "Forbidden. Token verification failed.",
      });
    }
  } else {
    // No Authorization header provided
    console.log("No Authorization header provided");
  }
};
module.exports=isAuthenticated