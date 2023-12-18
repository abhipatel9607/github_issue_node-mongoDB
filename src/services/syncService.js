/** @format */

const GithubApi = require("./githubService");
const dbService = require("./dbService");
const logger = require("../config/logger");
const { cli } = require("winston/lib/winston/config");

async function syncDbWithGithub() {
  try {
    const githubIssues = await GithubApi.fetchGithubIssues();
    await dbService.syncWithGithub(githubIssues);
    console.log("Sync successful");
  } catch (error) {
    logger.error("Error syncing issues:", error);
  }
}

module.exports = {
  syncDbWithGithub,
};
