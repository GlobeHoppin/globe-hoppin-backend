# GlobeHoppin Backend

Welcome to the backend repository for GlobeHoppin, a project built using Node.js, Express, and MongoDB. This document provides instructions on setting up the project, running it locally, and contributing to the codebase.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [Git](https://git-scm.com/)

## Project Setup and Running Locally

### 1. Star and Fork the Repository

- **Star**: If you like this project, please give it a star! ⭐
- **Fork**: Click the `Fork` button at the top right corner to create a copy of the repository in your account.

### 2. Clone the Repository

Clone your forked repository to your local machine using Git or GitHub Desktop.

#### Using Git (Terminal/Bash):

```bash
git clone https://github.com/your-username/globe-hoppin-backend.git
```

#### Using GitHub Desktop:

1. Open GitHub Desktop and click on `File > Clone Repository`.
2. Select the repository you just forked and clone it.

### 3. Navigate to the Project Directory

```bash
cd globe-hoppin-backend
```

### 4. Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```

### 5. Set Up Environment Variables

Create a `.env` file in the root directory of the project and add the following configuration values:

```env
PORT=8080
MONGO_DBNAME=yourDatabaseName
MONGO_HOSTS=localhost:27017
MONGO_USERNAME=yourUsername
MONGO_PASSWORD=yourPassword
SECRET=yourSecretKey
TOKEN_EXPIRY=3600
```

### 6. Run the Application

You can run the application in development mode with nodemon or normally with npm:

#### Development Mode (with nodemon):

```bash
npm run dev
```

#### Normal Mode:

```bash
npm start
```

## Contributing

We welcome contributions to improve GlobeHoppin. To contribute, follow these steps:

### 1. Fork the Repository

Click the `Fork` button to create a copy of the repository in your account.

### 2. Create a New Issue or Select an Existing One

Make sure to start working only after creating or selecting an issue.

### 3. Create a New Branch

Create a new branch for your work, including the issue number in the branch name (e.g., `edit-readme-14`):

```bash
git checkout -b 'edit-readme-14'
```

### 4. Make Your Changes

Implement your changes to the codebase.

### 5. Commit Your Changes

Commit your changes, including the issue number in the commit message:

```bash
git commit -m 'Enhanced README.md #14'
```

### 6. Push to Your Branch

Push your changes to your forked repository:

```bash
git push origin <your-branch-name>
```

### 7. Open a Pull Request

Open a pull request to merge your changes into the main repository.

### Note

- **Squash Commits**: Try to squash all your commits into one before submitting your pull request.
- **Rebase with Main**: Always rebase with the main branch instead of merging:

  ```bash
  git reset --soft $(git merge-base main HEAD)
  git add .
  git commit -m 'commit message'
  git push origin <branch-name> --force-with-lease
  ```

## How to Update Your Fork

To keep your fork updated with the original repository, you need to pull and merge updates from the upstream repository:

```bash
# Fetch upstream repository
git fetch upstream

# Switch to main branch
git checkout main

# Merge upstream changes into your local main branch
git merge upstream/main
```

Or using a single command:

```bash
# Switch to main branch
git checkout main

# Pull and merge upstream changes
git pull origin main
```

---
