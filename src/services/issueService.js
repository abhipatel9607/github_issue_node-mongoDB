const Issue = require("../models/issueModel");

async function syncWithGithub(githubIssues) {
	try {
		for (const githubIssue of githubIssues) {
			const existingIssue = await Issue.findOne({ number: githubIssue.number });

			if (existingIssue) {
				await Issue.updateOne({ number: githubIssue.number }, githubIssue);
			} else {
				await Issue.create(githubIssue);
			}
		}

		console.log("Sync with GitHub completed");
	} catch (error) {
		console.error("Error syncing with GitHub:", error);
		throw error;
	}
}

module.exports = {
	syncWithGithub,
};
