/** @format */

const express = require("express");
const passport = require("../middleware/authMiddleware");
const issueController = require("../controllers/issueController");

const router = express.Router();

router.post(
  "/sync",
  passport.authenticate("jwt", { session: false }),
  issueController.syncIssues
);
router.get(
  "/issues/:issue_id",
  passport.authenticate("jwt", { session: false }),
  issueController.getIssueById
);
router.put(
  "/issues/:issue_id",
  passport.authenticate("jwt", { session: false }),
  issueController.updateIssue
);

module.exports = router;
