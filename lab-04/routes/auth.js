const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../config/database");
const JWT_SECRET = require("../config/jwt");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register/", async (req, res) => {
  const { username, name, password } = req.body || {};

  if (
    typeof username !== "string" ||
    typeof name !== "string" ||
    typeof password !== "string" ||
    username.trim() === "" ||
    name.trim() === "" ||
    password.trim() === ""
  ) {
    return res.status(400).json({
      error: "Username, name, and password are required.",
    });
  }

  const cleanUsername = username.trim();
  const cleanName = name.trim();

  try {
    const existingUser = await new Promise((resolve, reject) => {
      db.get(
        "SELECT id FROM users WHERE username = ?",
        [cleanUsername],
        (error, row) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(row);
        }
      );
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists." });
    }

    // Hash the password before it is written to the database.
    const passwordHash = await bcrypt.hash(password, 10);

    await new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO users (username, name, password) VALUES (?, ?, ?)",
        [cleanUsername, cleanName, passwordHash],
        (error) => {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        }
      );
    });

    return res.status(201).json({ message: "Registration successful." });
  } catch (error) {
    if (
      error.code === "SQLITE_CONSTRAINT" ||
      error.code === "SQLITE_CONSTRAINT_UNIQUE"
    ) {
      return res.status(400).json({ error: "Username already exists." });
    }

    console.error("Registration failed:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/login/", async (req, res) => {
  const { username, password } = req.body || {};

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    username.trim() === "" ||
    password.trim() === ""
  ) {
    return res.status(400).json({
      error: "Username and password are required.",
    });
  }

  try {
    const user = await new Promise((resolve, reject) => {
      db.get(
        "SELECT username, password FROM users WHERE username = ?",
        [username.trim()],
        (error, row) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(row);
        }
      );
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    // The username is the only user data in the payload; JWT adds iat and exp.
    const token = jwt.sign({ username: user.username }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ jwt_token: token });
  } catch (error) {
    console.error("Login failed:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
});

router.get("/profile/", authMiddleware, async (req, res) => {
  try {
    const user = await new Promise((resolve, reject) => {
      db.get(
        "SELECT username, name FROM users WHERE username = ?",
        [req.username],
        (error, row) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(row);
        }
      );
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json({
      username: user.username,
      name: user.name,
    });
  } catch (error) {
    console.error("Profile lookup failed:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
