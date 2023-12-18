const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const issueRoutes = require("./src/routes/issueRoutes");

const app = express();

mongoose.connect(config.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err) => console.error("MongoDB connection error:", err));
db.once("open", () => console.log("Connected to MongoDB"));

app.use(express.json());
app.use("/", issueRoutes);

app.listen(config.PORT, () => {
	console.log(`Server is running on http://localhost:${config.PORT}`);
});
