/** @format */

const express = require("express");
const issueController = require("../controllers/issueController");

const router = express.Router();

router.post("/sync", issueController.syncIssues);
router.get("/issues/:issue_id", issueController.getIssueById);
router.put("/issues/:issue_id", issueController.updateIssue);

module.exports = router;
