const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config/jwt");

function authMiddleware(req, res, next) {
  const authorizationHeader = req.get("Authorization");

  if (!authorizationHeader) {
    return res.status(401).json({ error: "Authorization token is required." });
  }

  const bearerMatch = authorizationHeader.match(/^Bearer\s+(\S+)$/i);

  if (!bearerMatch) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }

  try {
    const payload = jwt.verify(bearerMatch[1], JWT_SECRET);

    if (typeof payload === "string" || typeof payload.username !== "string") {
      return res.status(401).json({ error: "Invalid or expired token." });
    }

    req.username = payload.username;
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
}

module.exports = authMiddleware;
