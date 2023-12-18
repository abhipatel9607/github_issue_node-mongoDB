/** @format */

const Issue = require("../models/issueModel");
const logger = require("../config/logger");

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
    logger.error("Error syncing with GitHub:", error);
    throw error;
  }
}

async function findAndUpdate(issueId, updatedDetails) {
  try {
    const updatedIssue = await Issue.findOneAndUpdate(
      { number: issueId },
      updatedDetails,
      { new: true }
    );
    return updatedIssue;
  } catch (error) {
    logger.error("Error Updating DataBase:", error);
    throw error;
  }
}

async function getIssue(issueId) {
  try {
    const issue = await Issue.findOne({ number: issueId });
    return issue;
  } catch (error) {
    logger.error("Issue not found in DataBase:", error);
    throw error;
  }
}

module.exports = {
  syncWithGithub,
  findAndUpdate,
  getIssue,
};
