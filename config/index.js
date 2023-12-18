require("dotenv").config();

module.exports = {
	PORT: process.env.PORT || 3000,
	MONGO_URL: process.env.MONGO_URL,
	GITHUB_USERNAME: process.env.GITHUB_USERNAME,
	GITHUB_REPO: process.env.GITHUB_REPO,
	GITHUB_TOKEN: process.env.GITHUB_TOKEN,
};
