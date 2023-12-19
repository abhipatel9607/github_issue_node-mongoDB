/** @format */

const express = require("express");
const mongoose = require("mongoose");
const config = require("./src/config/index");
const errorHandler = require("./src/middleware/errorHandler");
const issueRoutes = require("./src/routes/issueRoutes");
const authRoutes = require("./src/routes/authRoutes");
const passport = require("./src/middleware/authMiddleware");

const app = express();

mongoose.connect(config.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err) => console.error("MongoDB connection error:", err));
db.once("open", () => console.log("Connected to MongoDB"));

app.use(express.json());

app.use(passport.initialize());

// Routes
app.use("/auth", authRoutes);
app.use("/", issueRoutes);

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT}`);
});
