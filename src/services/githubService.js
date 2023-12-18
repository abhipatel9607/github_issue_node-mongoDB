/** @format */

const axios = require("axios");
const config = require("../config/index");
const logger = require("../config/logger");
require("dotenv").config();

const ISSUES_PER_BATCH = 3;
class GithubApi {
  constructor() {
    this.baseURL = `https://api.github.com/repos/${config.GITHUB_USERNAME}/${config.GITHUB_REPO}`;
    this.headers = {
      Authorization: `Bearer ${config.GITHUB_TOKEN}`,
    };
  }

  // Fetch all github issue
  async fetchGithubIssues() {
    let allIssues = [];

    try {
      const totalCountResponse = await axios.get(this.baseURL);
      const totalCount = totalCountResponse.data.open_issues_count;
      const numBatches = Math.ceil(totalCount / ISSUES_PER_BATCH);

      for (let i = 0; i < numBatches; i += ISSUES_PER_BATCH) {
        const batch = Array.from(
          { length: Math.min(ISSUES_PER_BATCH, numBatches - i) },
          (_, index) => i + index + 1
        );

        const batchPromises = batch.map(async (batchNumber) => {
          const response = await axios.get(`${this.baseURL}/issues`, {
            headers: this.headers,
            params: {
              page: batchNumber,
              per_page: ISSUES_PER_BATCH,
            },
          });

          return response.data;
        });

        const batchResults = await Promise.all(batchPromises);
        allIssues = allIssues.concat(...batchResults);

        if (i < numBatches - ISSUES_PER_BATCH) {
          await this.delay(1000);
        }
      }

      return allIssues;
    } catch (error) {
      logger.error("Error fetching GitHub issues:", error);
      throw error;
    }
  }

  // update a github issue
  async updateGithubIssue(issueId, updatedDetails) {
    try {
      await axios.patch(`${this.baseURL}/issues/${issueId}`, updatedDetails, {
        headers: this.headers,
      });
    } catch (error) {
      logger.error("Error updating GitHub issue:", error);
      throw error;
    }
  }

  async delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

module.exports = new GithubApi();
