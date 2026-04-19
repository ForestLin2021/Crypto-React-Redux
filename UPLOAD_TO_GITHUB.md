# 📤 How to Upload This Project to GitHub

Follow these steps to push this project to a new GitHub repository.

---

## Step 1: Create a New Repo on GitHub

1. Go to **https://github.com/new**
2. Repository name: `Crypto-React-Redux` (or anything you want)
3. Description: *A React + Redux cryptocurrency tracker app*
4. Choose **Public** or **Private**
5. ⚠️ **DO NOT** check "Add a README", "Add .gitignore", or "Add a license" — we already have those
6. Click **Create repository**

GitHub will show you a page with setup instructions. Keep that tab open.

---

## Step 2: Initialize Git Locally

Open a terminal in the `Crypto-React-Redux` folder and run:

```bash
cd Crypto-React-Redux

# Initialize a new git repo
git init

# Stage all files
git add .

# First commit
git commit -m "Initial commit: Cryptoverse React app"

# Rename branch to main (GitHub default)
git branch -M main
```

---

## Step 3: Connect to GitHub & Push

Replace `<your-username>` with your actual GitHub username:

```bash
# Add your GitHub repo as the remote origin
git remote add origin https://github.com/<your-username>/Crypto-React-Redux.git

# Push your code to GitHub
git push -u origin main
```

If prompted, log in with your GitHub credentials (or use a Personal Access Token if 2FA is enabled).

---

## Step 4: Verify

Refresh your GitHub repo page in the browser — your files should all be there! 🎉

---

## ⚠️ Before You Push — Quick Checklist

- [x] `.gitignore` is in place (already done — excludes `node_modules`, `.env`, `build`, etc.)
- [x] `.env.example` is included as a template (no real keys committed)
- [x] **Make sure you don't have a real `.env` file in the folder** — if you do, double-check `.gitignore` is excluding it before running `git add .`
- [x] `README.md` is ready

To verify nothing sensitive will be pushed, after `git add .` run:
```bash
git status
```
Make sure `.env` is **NOT** in the list. If it is, stop and check your `.gitignore`.

---

## 🔑 Authentication Note

If GitHub rejects your password when pushing, you'll need a **Personal Access Token** instead:

1. Go to https://github.com/settings/tokens
2. Click **Generate new token (classic)**
3. Give it `repo` scope
4. Use the token as your password when pushing

Or set up **SSH keys** for a smoother experience: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
