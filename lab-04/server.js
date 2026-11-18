const express = require("express");
const { initializeDatabase } = require("./config/database");
const authRouter = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/", authRouter);

async function startServer() {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize the database:", error.message);
    process.exitCode = 1;
  }
}

startServer();
