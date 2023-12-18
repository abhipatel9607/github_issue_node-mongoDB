const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
	title: String,
	body: String,
	number: Number,
	id: Number,
});

const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;
