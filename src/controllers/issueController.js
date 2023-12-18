const Issue = require("../models/issueModel");
const githubService = require("../services/githubService");
const issueService = require("../services/issueService");

const syncIssues = async (req, res) => {
	try {
		const githubIssues = await githubService.fetchGithubIssues();

		await issueService.syncWithGithub(githubIssues);

		res.status(200).json({ message: "Sync successful" });
	} catch (error) {
		console.error("Error syncing issues:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const getIssueById = async (req, res) => {
	const issueId = req.params.issue_id;

	try {
		const issue = await Issue.findOne({ number: issueId });

		if (!issue) {
			return res.status(404).json({ error: "Issue not found" });
		}

		res.status(200).json(issue);
	} catch (error) {
		console.error("Error fetching issue:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const updateIssue = async (req, res) => {
	const issueId = req.params.issue_id;
	const updatedDetails = req.body;

	try {
		const updatedIssue = await Issue.findOneAndUpdate(
			{ number: issueId },
			updatedDetails,
			{ new: true }
		);

		await githubService.updateGithubIssue(issueId, updatedDetails);

		if (!updatedIssue) {
			return res.status(404).json({ error: "Issue not found" });
		}

		res.status(200).json(updatedIssue);
	} catch (error) {
		console.error("Error updating issue:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = {
	syncIssues,
	getIssueById,
	updateIssue,
};
