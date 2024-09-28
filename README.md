# Project Setup and Running Locally

## Prerequisites
- Ensure you have [Node.js](https://nodejs.org/) installed (version 14.x or later recommended).
- Ensure you have [Git](https://git-scm.com/) installed.

## Setup Instructions

1. ### Star and Fork the Repo
    - Feel free to Star:star: the repo, if you like it.
    - Click on `fork` button in the right corner.It will create a copy of repository in your account.
    - Creating the copy of repository

2. ### Clone the Repo
    You can **clone** your repository in your local pc with use of **[Github_Desktop](https://desktop.github.com/)** application or for your [Terminal/bash](https://git-scm.com/downloads).

   For **Terminal** -

   ```bash
   git clone https://github.com/GlobeHoppin/globe-hoppin-backend.git
   ```

2. Navigate to the project directory

    ```bash
    cd globe-hoppin-backend
    ```

3. Install dependencies
    ```bash
    npm install
    ```

4. Setup env variables - 
    Create a `.env` file in the root directory of the project and add the following configuration values:
    ```
    PORT=8080
    MONGO_DBNAME=
    MONGO_HOSTS=27017
    MONGO_USERNAME=
    MONGO_PASSWORD=
    SECRET=
    TOKEN_EXPIRY=
    ```

4. Run the application
    ```bash
    npm run dev -> to run with nodemon

    npm run start -> to run normally
    ```

## Contributing
* Fork the repository. 
* Create a new issue or select an existing one. Make sure you start working only after creating the issue.
* Create a new **branch**. - Make careful to add the issue number while creating the branch.

   ```bash
   git checkout -b 'branch_name - issue number'
   ```
* Make your changes.
* Commit your changes, making sure to include the issue number in the commit message.
    ```bash
    git commit -m 'commit message #issue number'
    ```
* Push to the branch 
    ```bash
    git push origin <your-branch-name>
    ```
* Open a pull request.

## Note
* Try to squash all your commits into one while addresing the request changes.
* Always try to `rebase` with `main` branch instead of `merge`
    ```bash
    git reset --soft $(git merge-base main HEAD)
    git add .
    git commit -m 'commit message'
    git push origin <branch-name> --force-with-l
    ```



## How to Update

In the case when you kept the original repository git history, so you have to update your repo from remote to avoid conflict and update to date your repo with others work. 
You can always pull and merge updates from the "upstream" repository back into your
project by running:

```bash
$ git fetch upstream            # Fetch (upstream) repository
$ git checkout main             # Switch to the main branch (or, master branch)
$ git merge upstream/main       # Merge upstream/master into the local branch
```
**Or**
```bash
$ git checkout main             # Switch to the main branch (or, master branch)
$ git pull origin main          # Fetch and Merge upstream/master into the local branch
```
_ _ _