# GITHUB ISSUE - NODE & MONGO DB

This is a Node.js project for syncing data from GitHub issues onto a MongoDB database using the GitHub API, Express.js, and Mongoose.

## Prerequisites

Before starting the project, make sure you have the following:

- A GitHub repo with at least 10 issues.
- A GitHub API token.
- MongoDB installed and running.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/abhipatel9607/github_issue_node-mongoDB.git
   ```
2. Change the repository:

   ```bash
   github_issue_node-mongoDB
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root and add the following environment variables:
   ```bash
   PORT=3000
   MONGO_URL=mongodb://localhost:27017/your-database-name
   GITHUB_USERNAME=your-github-username
   GITHUB_REPO=your-github-repo
   GITHUB_TOKEN=your-github-token
   ```
5. Start the development server:
   ```bash
   npm run devStart
   ```

## Project Structure

The project is organized into different folders:

- `src/controllers` : Contains the route controllers.
- `src/models` : Defines the MongoDB data models.
- `src/routes` : Defines the Express.js routes.
- `src/services` : Contains the GitHub API service.

## Scripts

- `npm run devStart` : Starts the development server using Nodemon.

## Dependencies

- `axios` : Promise-based HTTP client for the browser and Node.js.
- `express` : Fast, unopinionated, minimalist web framework for Node.js.
- `mongoose` : Elegant MongoDB object modeling for Node.js.
- `dotenv` : Zero-dependency module that loads environment variables from a .env file.
- `nodemon` : Utility that monitors for changes in your source code and automatically restarts your server.
