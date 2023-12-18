const axios = require("axios");
require("dotenv").config();

const fetchGithubIssues = async () => {
	const batchSize = 3;
	let allIssues = [];

	try {
		const totalCountResponse = await axios.get(
			`https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPO}`
		);
		const totalCount = totalCountResponse.data.open_issues_count;

		// Calculate the number of batches
		const numBatches = Math.ceil(totalCount / batchSize);

		// Fetch issues batch by batch
		for (let i = 0; i < numBatches; i++) {
			const response = await axios.get(
				`https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPO}/issues`,
				{
					headers: {
						Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
					},
					params: {
						page: i + 1,
						per_page: batchSize,
					},
				}
			);

			allIssues = allIssues.concat(response.data);

			if (i < numBatches - 1) {
				await new Promise((resolve) => setTimeout(resolve, 1000));
			}
		}

		return allIssues;
	} catch (error) {
		console.error("Error fetching GitHub issues:", error);
		throw error;
	}
};

const updateGithubIssue = async (issueId, updatedDetails) => {
	await axios.patch(
		`https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPO}/issues/${issueId}`,
		updatedDetails,
		{
			headers: {
				Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
			},
		}
	);
};

module.exports = {
	fetchGithubIssues,
	updateGithubIssue,
};
