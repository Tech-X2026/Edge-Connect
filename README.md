# Next.js Web Application Setup Guide

Welcome to the project! This guide will walk you through setting up and running this application locally on your computer, starting from scratch.

---

## 🛠️ Step 1: Install Visual Studio Code (VS Code)
VS Code is the recommended code editor for this project.
1. Download VS Code for your operating system from the official website: [Download VS Code](https://code.visualstudio.com/).
2. Run the installer and follow the prompt instructions.
3. Open VS Code once installation is complete.

---

## 🟢 Step 2: Install Node.js
Node.js is the runtime environment required to run this Next.js project.
1. Go to the [Node.js Official Website](https://nodejs.org/).
2. Download the **LTS (Long Term Support)** version recommended for most users.
3. Run the installer and complete the setup wizard.
4. Verify the installation by opening your command prompt/terminal and typing:
   ```bash
   node -v
   npm -v
   ```
   *(These commands should print the version numbers of Node.js and npm respectively.)*

---

## 🐙 Step 3: Install Git (If not already installed)
Git is required to clone the repository.
1. Download Git from the [Git Official Website](https://git-scm.com/).
2. Follow the installer instructions.
3. Verify the installation by running:
   ```bash
   git --version
   ```

---

## 📥 Step 4: Clone the Repository
1. Open your terminal, command prompt, or Git Bash.
2. Navigate to the directory where you want to keep the project (e.g., `cd Documents` or `cd Desktop`).
3. Clone the repository using the following command:
   ```bash
   git clone <REPOSITORY_URL>
   ```
   *(Replace `<REPOSITORY_URL>` with your repository's actual clone link, or use the path provided by your host)*
4. Navigate into the project folder:
   ```bash
   cd Edge
   ```

---

## 💻 Step 5: Open the Project in VS Code
1. While inside the project folder in your terminal, type:
   ```bash
   code .
   ```
   *(This will automatically open the project directory in VS Code.)*
2. Alternatively, open VS Code, click on **File > Open Folder...**, and select the project directory.

---

## 📦 Step 6: Install Dependencies
Open the integrated terminal in VS Code (shortcut: ``Ctrl + ` `` or **Terminal > New Terminal** in the top menu) and run:
```bash
npm install
```
This will download all the necessary libraries and packages specified in the `package.json` file.

---

## ⚙️ Step 7: Configure Environment Variables (Optional)
If your project uses environment variables (like API keys, configuration settings, etc.):
1. Look for a `.env` or `.env.example` file in the root folder.
2. If needed, create a copy and name it `.env.local` to store your local secrets:
   ```bash
   # Add any local overrides in .env.local
   ```

---

## 🚀 Step 8: Run the Project Locally
Start the development server with:
```bash
npm run dev
```

Once the terminal output shows that the server has started successfully (usually taking just a few seconds), open your web browser and navigate to:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📁 Project Commands Reference

Inside the project directory, you can run the following main scripts:

*   `npm run dev` - Starts the development server on port 3000 with hot-reloading.
*   `npm run build` - Builds the application for production usage.
*   `npm run start` - Runs the built application in production mode.
*   `npm run lint` - Checks the code for standard syntax and formatting errors.
