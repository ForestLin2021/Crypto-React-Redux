# 🚀 Deploy to AWS — Complete Beginner Guide

This guide walks you through deploying your React app to AWS using **S3 + CloudFront + GitHub Actions** — completely free for personal projects.

**Estimated time:** 60-90 minutes (first time)
**Cost:** $0/month (within AWS free tier limits)

---

## 📚 What You'll Build

```
You push code to GitHub
        ↓
GitHub Actions builds your React app
        ↓
Uploads files to AWS S3 (storage)
        ↓
CloudFront serves it globally with HTTPS (CDN)
        ↓
Anyone in the world can visit your site!
```

---

## 📋 Table of Contents

1. [Create an AWS Account](#step-1-create-an-aws-account)
2. [Set Up Billing Alerts (IMPORTANT!)](#step-2-set-up-billing-alerts-important)
3. [Create an S3 Bucket](#step-3-create-an-s3-bucket)
4. [Create a CloudFront Distribution](#step-4-create-a-cloudfront-distribution)
5. [Create an IAM User for GitHub Actions](#step-5-create-an-iam-user-for-github-actions)
6. [Configure GitHub Secrets](#step-6-configure-github-secrets)
7. [Push and Deploy](#step-7-push-and-deploy)
8. [Verify Your Site is Live](#step-8-verify-your-site-is-live)
9. [Troubleshooting](#troubleshooting)

---

## Step 1: Create an AWS Account

> ⏱️ ~10 minutes | 💳 Credit card required (won't be charged within free tier)

1. Go to **https://aws.amazon.com/** and click **"Create an AWS Account"**
2. Enter:
   - **Email address** (use one you check often — AWS sends important emails)
   - **AWS account name** (e.g., "your-name-personal")
3. Verify your email with the code AWS sends
4. Create a strong password
5. Choose **"Personal"** account type
6. Fill in your contact information
7. **Add a credit card** — required even for free tier. **You won't be charged** as long as you stay within free limits (we'll set up alerts in Step 2 to make sure)
8. Verify your phone number via SMS or call
9. Choose the **"Basic Support - Free"** plan
10. Sign in to the AWS Console at **https://console.aws.amazon.com/**

> 💡 **Tip:** After signing in, look at the top-right corner. You'll see a region like "N. Virginia". Click it and **select `US East (N. Virginia) us-east-1`**. This is required for CloudFront to work properly with SSL certificates. Keep it on `us-east-1` throughout this entire guide.

---

## Step 2: Set Up Billing Alerts (IMPORTANT!) ⚠️

> ⏱️ ~5 minutes | This protects you from surprise charges

**Do this FIRST before anything else.** AWS bills can spiral if something goes wrong (e.g., someone finds your S3 keys and uploads terabytes of data). Alerts give you peace of mind.

### 2a. Enable Billing Alerts

1. Click your account name (top-right) → **"Billing and Cost Management"**
2. In the left sidebar, click **"Billing preferences"**
3. Under "Alert preferences", click **"Edit"**
4. Check ☑️ **"AWS Free Tier alerts"** — get emails when you approach free tier limits
5. Check ☑️ **"CloudWatch billing alerts"**
6. Enter your email address
7. Click **"Update"**

### 2b. Create a Budget Alert

1. In the same Billing area, click **"Budgets"** in the left sidebar
2. Click **"Create budget"**
3. Choose **"Use a template (simplified)"** → **"Zero spend budget"**
4. Budget name: `personal-project-alert`
5. Email recipient: your email
6. Click **"Create budget"**

Now AWS will email you the moment ANY charge appears on your account, even $0.01. ✉️

> 💡 **Why this matters:** This is your safety net. If you ever get an unexpected email, log in immediately and check what's running.

---

## Step 3: Create an S3 Bucket

> ⏱️ ~5 minutes | This is where your website files live

S3 is AWS's "file storage" service. We'll create a "bucket" (basically a folder) to hold your React app's files.

1. In the AWS Console search bar (top), type **"S3"** and click the S3 service
2. Click **"Create bucket"**
3. **Bucket name:** Must be globally unique (no one else on AWS can have it). Try:
   - `crypto-react-redux-yourname-2026`
   - (Replace `yourname` with something unique to you)
4. **AWS Region:** `US East (N. Virginia) us-east-1` ⚠️ Important: keep this consistent
5. **Object Ownership:** Leave as default (`ACLs disabled`)
6. **Block Public Access settings:** ✅ Keep ALL boxes checked (block public access). CloudFront will access it privately.
7. **Bucket Versioning:** Disable (saves money)
8. **Default encryption:** Leave defaults (SSE-S3)
9. Scroll down and click **"Create bucket"**

✅ **Write down your bucket name somewhere — you'll need it later!**

Example: `crypto-react-redux-johndoe-2026`

---

## Step 4: Create a CloudFront Distribution

> ⏱️ ~15 minutes | This is your global CDN with HTTPS

CloudFront makes your site fast worldwide and adds free HTTPS.

### 4a. Create the Distribution

1. In the AWS Console search bar, type **"CloudFront"** and click the service
2. Click **"Create distribution"**
3. **Origin domain:** Click the dropdown — your S3 bucket should appear. Select it.
   - ⚠️ Important: Select the bucket itself, NOT the "S3 website endpoint" version
4. **Origin access:** Select **"Origin access control settings (recommended)"**
5. Click **"Create new OAC"** → leave defaults → **Create**
6. Make sure the new OAC is selected in the dropdown

### 4b. Default Cache Behavior

Scroll down to "Default cache behavior":

7. **Viewer protocol policy:** Select **"Redirect HTTP to HTTPS"**
8. **Allowed HTTP methods:** Leave default (`GET, HEAD`)
9. **Cache key and origin requests:** Select **"Cache policy and origin request policy (recommended)"**
10. **Cache policy:** Select **"CachingOptimized"**

### 4c. Web Application Firewall

11. **Web Application Firewall (WAF):** Select **"Do not enable security protections"**
    - ⚠️ **Important:** Enabling WAF costs $15/month. We don't need it for a personal project.

### 4d. Settings

12. **Price class:** Select **"Use only North America and Europe"**
    - This is cheaper and your free tier covers it for personal use
13. **Alternate domain name (CNAME):** Leave blank (you said you don't need a custom domain)
14. **Custom SSL certificate:** Leave blank (uses default `*.cloudfront.net` certificate)
15. **Default root object:** Type `index.html`
16. Leave everything else as default
17. Click **"Create distribution"**

### 4e. Update S3 Bucket Policy (CloudFront needs permission to read from S3)

After clicking Create, AWS will show a yellow banner at the top:
> ⚠️ "The S3 bucket policy needs to be updated"

18. Click **"Copy policy"** in that banner
19. Click **"Go to S3 bucket permissions"** (also in that banner)
20. In the S3 bucket page, scroll to **"Bucket policy"** and click **"Edit"**
21. Paste the policy you copied
22. Click **"Save changes"**

### 4f. Configure SPA Routing (Critical for React!)

React uses client-side routing. Without this fix, refreshing on `/cryptocurrencies` would 404.

23. Go back to your CloudFront distribution
24. Click the **"Error pages"** tab
25. Click **"Create custom error response"**
26. Configure:
    - **HTTP error code:** `403: Forbidden`
    - **Customize error response:** `Yes`
    - **Response page path:** `/index.html`
    - **HTTP Response code:** `200: OK`
27. Click **"Create custom error response"**
28. Repeat for `404: Not Found` with the same settings

### 4g. Wait for Distribution to Deploy

⏳ CloudFront takes **5-15 minutes** to deploy globally. You'll see "Last modified" change from `Deploying` to a date.

While you wait, **write down these two values** from your distribution page:
- **Distribution ID** (looks like `E1A2B3C4D5E6F7`)
- **Distribution domain name** (looks like `d1234abcd.cloudfront.net`)

---

## Step 5: Create an IAM User for GitHub Actions

> ⏱️ ~10 minutes | This gives GitHub safe, limited permission to deploy

We don't want GitHub to use your master AWS account. Instead, we create a "robot user" with only the permissions it needs.

### 5a. Create the User

1. In the AWS Console search bar, type **"IAM"** and click the service
2. In the left sidebar, click **"Users"**
3. Click **"Create user"**
4. **User name:** `github-actions-crypto-react`
5. ⚠️ **Do NOT** check "Provide user access to AWS Management Console" (this user is for automation only)
6. Click **"Next"**

### 5b. Attach Permissions

7. Select **"Attach policies directly"**
8. Click **"Create policy"** (opens in a new tab)
9. In the new tab, click the **"JSON"** tab
10. **Replace everything** in the editor with this (replace `YOUR-BUCKET-NAME` and `YOUR-DISTRIBUTION-ID` with your real values):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3DeployPermissions",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::YOUR-BUCKET-NAME",
        "arn:aws:s3:::YOUR-BUCKET-NAME/*"
      ]
    },
    {
      "Sid": "CloudFrontInvalidation",
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation"
      ],
      "Resource": "arn:aws:cloudfront::*:distribution/YOUR-DISTRIBUTION-ID"
    }
  ]
}
```

11. Click **"Next"**
12. **Policy name:** `github-actions-crypto-react-policy`
13. Click **"Create policy"**
14. **Close that tab** and go back to the user creation tab
15. Click the 🔄 refresh icon next to the policy list
16. Search for `github-actions-crypto-react-policy` and ✅ check the box
17. Click **"Next"** → **"Create user"**

### 5c. Create Access Keys

18. Click on the user you just created
19. Click the **"Security credentials"** tab
20. Scroll down to **"Access keys"** → click **"Create access key"**
21. Select **"Other"** (not "Application running on AWS service")
22. Click **"Next"** → optionally add a description → **"Create access key"**
23. ⚠️ **CRITICAL:** Copy BOTH values to a safe place RIGHT NOW:
    - **Access key ID** (looks like `AKIA...`)
    - **Secret access key** (long random string)
    - This is the **only time** AWS shows you the secret. If you lose it, you have to make a new one.

---

## Step 6: Configure GitHub Secrets

> ⏱️ ~5 minutes | Tells GitHub Actions what your AWS credentials are

1. Go to your GitHub repo: `https://github.com/<your-username>/Crypto-React-Redux`
2. Click **"Settings"** (top right of the repo)
3. In the left sidebar, click **"Secrets and variables"** → **"Actions"**
4. Click **"New repository secret"** for each of the following:

| Secret Name | Value |
|-------------|-------|
| `AWS_ACCESS_KEY_ID` | The Access key ID from Step 5c |
| `AWS_SECRET_ACCESS_KEY` | The Secret access key from Step 5c |
| `AWS_REGION` | `us-east-1` |
| `AWS_S3_BUCKET` | Your S3 bucket name from Step 3 |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | Your distribution ID from Step 4g |
| `AWS_CLOUDFRONT_DOMAIN` | Your CloudFront domain (e.g., `d1234abcd.cloudfront.net`) |
| `REACT_APP_RAPIDAPI_KEY` | Your RapidAPI key |
| `REACT_APP_CRYPTO_API_URL` | `https://coinranking1.p.rapidapi.com` |
| `REACT_APP_CRYPTO_RAPIDAPI_HOST` | `coinranking1.p.rapidapi.com` |
| `REACT_APP_NEWS_API_URL` | `https://bing-news-search1.p.rapidapi.com` |
| `REACT_APP_NEWS_RAPIDAPI_HOST` | `bing-news-search1.p.rapidapi.com` |

> 💡 **Why secrets?** They're encrypted by GitHub. Your code never contains your AWS keys, so even if your repo is public, your credentials are safe.

---

## Step 7: Push and Deploy

> ⏱️ ~3 minutes | This is the magic moment!

The workflow file (`.github/workflows/deploy.yml`) is already in your project. The first push will trigger it automatically.

If you haven't pushed your project yet, follow the steps in `UPLOAD_TO_GITHUB.md`. Otherwise:

```bash
# Make any small change (e.g., edit README), then:
git add .
git commit -m "Trigger first AWS deployment"
git push
```

Then go to your GitHub repo → click the **"Actions"** tab. You should see a workflow running with a yellow ⏱️ icon.

**It takes about 3-5 minutes:**
- ⏱️ Setting up Node.js — 30s
- ⏱️ Installing dependencies — 1-2 min
- ⏱️ Building React app — 1 min
- ⏱️ Uploading to S3 — 30s
- ⏱️ CloudFront cache invalidation — 30s

When you see a ✅ green checkmark, it's done!

---

## Step 8: Verify Your Site is Live

🎉 Open your CloudFront URL in your browser:

**`https://YOUR-DISTRIBUTION-DOMAIN.cloudfront.net`**

(Replace with the actual one from Step 4g)

You should see your Cryptoverse app! 🪙

### Test the SPA Routing

1. Click around the app — go to "Cryptocurrencies" or "News"
2. **Refresh the page** (F5)
3. ✅ If the page loads correctly, your SPA routing works
4. ❌ If you get a "403 Forbidden" or blank page, check Step 4f

---

## 🔄 How Future Deployments Work

From now on, your workflow is super simple:

```bash
# Make changes to your code
git add .
git commit -m "Add new feature"
git push
```

That's it! GitHub Actions will automatically:
- Build your app
- Upload to S3
- Refresh CloudFront cache

Your site updates in ~3-5 minutes. ✨

---

## 🆘 Troubleshooting

### Workflow fails with "Access Denied" on S3
- Check your IAM policy has the correct bucket name
- Check that all GitHub Secrets are spelled correctly (case sensitive!)

### Site shows "AccessDenied" XML error
- Your S3 bucket policy is missing or incorrect
- Go back to Step 4e — the policy from CloudFront must be saved in S3

### Refreshing a route gives "403 Forbidden"
- You missed Step 4f (custom error responses)
- CloudFront needs to redirect 403/404 to `/index.html` with a 200 status

### CloudFront URL just shows "AccessDenied"
- Wait 5-10 minutes — CloudFront is still deploying
- Make sure `index.html` exists in your S3 bucket (after the first successful workflow)

### Updates don't show up after pushing
- CloudFront caches files. The workflow invalidates the cache automatically.
- Hard-refresh your browser: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)

### "Module not found" errors during build
- Check `package.json` — all dependencies should be listed
- Try running `npm install` and `npm run build` locally first to verify

### My RapidAPI calls fail in production
- Double-check your GitHub Secrets — the `REACT_APP_*` variables must match what's used in `src/services/`
- React reads env vars at build time, so a typo in a secret = build won't have the key

---

## 📊 Monitor Your AWS Usage

1. Go to **AWS Console** → search **"Billing"**
2. Click **"Free Tier"** in left sidebar
3. See exactly how much of your free tier you've used

For a personal React app like this, you should stay at **0% usage** of all relevant tiers. 🎉

---

## 🎯 What You've Learned (For Your Resume!)

You can now confidently say you've done:
- ✅ Deployed a React SPA on **AWS S3 + CloudFront**
- ✅ Configured a global CDN with **HTTPS** via CloudFront
- ✅ Built a **CI/CD pipeline** with GitHub Actions
- ✅ Implemented **IAM** least-privilege access for automation
- ✅ Configured **SPA routing** at the CDN level
- ✅ Set up **AWS billing alerts** and **cost monitoring**

**Suggested resume bullet:**
> Architected and deployed a React-based cryptocurrency tracking application on AWS using S3 for static hosting and CloudFront as a global CDN with HTTPS. Implemented automated CI/CD using GitHub Actions with IAM-based least-privilege access, enabling zero-downtime deployments triggered by Git pushes.

---

## ❓ Need Help?

If you get stuck on any step, the AWS error messages are usually very specific. Copy the exact error message and search it on Stack Overflow — chances are someone else has hit it too.

Good luck! 🚀
