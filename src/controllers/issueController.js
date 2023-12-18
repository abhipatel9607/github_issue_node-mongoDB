/** @format */

const {
  issueIdSchema,
  updatedDetailsSchema,
} = require("../middleware/joiValidation");

const githubService = require("../services/githubService");
const dbService = require("../services/dbService");
const syncService = require("../services/syncService");

const syncIssues = async (req, res, next) => {
  try {
    await syncService.syncDbWithGithub();
    res.status(200).json({ message: "Sync successful" });
  } catch (error) {
    next(error);
  }
};

const getIssueById = async (req, res, next) => {
  const issueId = req.params.issue_id;

  try {
    // Validate issueId using JOI schema
    await issueIdSchema.validateAsync({ issue_id: issueId });

    const issue = await dbService.getIssue(issueId);

    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    res.status(200).json(issue);
  } catch (error) {
    next(error);
  }
};

const updateIssue = async (req, res, next) => {
  const issueId = req.params.issue_id;
  const updatedDetails = req.body;

  try {
    // Validate issueId and updatedDetails using JOI schemas
    await issueIdSchema.validateAsync({ issue_id: issueId });
    await updatedDetailsSchema.validateAsync(updatedDetails);

    const updatedIssue = await dbService.findAndUpdate(issueId, updatedDetails);

    if (!updatedIssue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    await githubService.updateGithubIssue(issueId, updatedDetails);

    res.status(200).json(updatedIssue);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  syncIssues,
  getIssueById,
  updateIssue,
};
