# 💰 AWS Cost Safety Guide — Don't Get Surprise Bills

A short, practical guide to keeping your AWS bill at **$0** for personal projects, and what to do if something goes wrong.

---

## 🎯 The Goal

For a personal React project on S3 + CloudFront, your monthly bill should be **$0.00** — forever. This guide ensures it stays that way.

---

## 📊 What's Actually Free Forever

These limits are **always free**, not just for 12 months:

| Service | Always-Free Limit | What This Means |
|---------|-------------------|-----------------|
| **S3** | 5 GB storage | Your built React app is ~2-5 MB. You'll never use 5 GB. |
| **CloudFront** | 1 TB data transfer/month | A site with **millions** of monthly visits would barely touch this |
| **CloudFront** | 10M HTTP/HTTPS requests/month | Same — way more than personal projects need |
| **IAM** | Unlimited users & policies | Free for everyone, forever |
| **ACM SSL Certificates** | Free when used with CloudFront | Save $50-100/year vs traditional SSL |

> 💡 **Reality check:** The Cryptoverse app, with ~100 visits/month, uses maybe 0.001% of these limits. You are NOT going to hit them.

---

## ⚠️ How People Accidentally Get Bills

### 1. Leaking AWS Access Keys (Most Common!)

**The horror story:** You commit your AWS keys to GitHub by accident. Bots scan public repos within minutes. Within hours, attackers spin up huge EC2 instances to mine crypto. You wake up to a $5,000 bill.

**How to prevent it:**
- ✅ AWS keys NEVER go in your code — only in **GitHub Secrets**
- ✅ Your `.gitignore` already excludes `.env` files
- ✅ Use the limited IAM user we created (Step 5) — even if leaked, it can ONLY touch your S3 bucket and CloudFront, nothing else
- ✅ If you ever suspect a leak, **immediately** go to IAM → Users → your user → Security credentials → "Make inactive" on the access key

### 2. Enabling Services You Don't Need

AWS has 200+ services. Some are expensive. Stick to **only**:
- S3
- CloudFront
- IAM
- ACM (only if using a custom domain)
- Route 53 (only if using a custom domain — costs $0.50/month)

**Don't randomly click "Try this service" on services you don't recognize.**

### 3. Forgetting About a Service

Started an EC2 instance for a tutorial 3 months ago? It's been running this whole time at $0.50/day = $45/month.

**Prevention:** Once a month, go to the **Billing dashboard** and check what's running.

---

## 🛡️ Your Safety Net (Set Up Once)

If you followed Step 2 of `DEPLOY_TO_AWS.md`, you already have:

1. ✅ **Free Tier alerts** — email when you approach 85% of any free tier
2. ✅ **CloudWatch billing alerts** — required for budgets
3. ✅ **Zero spend budget** — email the moment ANY charge appears

**This means:** If something goes wrong, you'll know within 24 hours, not when you get the credit card bill 30 days later.

---

## 🔍 Monthly Health Check (5 minutes)

Once a month, do this:

### 1. Check Billing
- AWS Console → search "Billing"
- Look at "Bills" — should show $0.00 (or under $1 if you have Route 53)

### 2. Check Free Tier Usage
- AWS Console → "Billing" → "Free Tier" (left sidebar)
- All services should show low usage percentages

### 3. Check Active Resources
- Visit each service you use:
  - **S3** → confirm only your bucket exists
  - **CloudFront** → confirm only your distribution exists
  - **IAM** → confirm only your `github-actions-*` user exists
- ⚠️ If you see anything unexpected, investigate immediately

---

## 🚨 What to Do If You Get an Unexpected Bill

### Don't Panic — AWS Often Forgives First-Time Mistakes

1. **Stop the bleeding immediately:**
   - Go to the service that's billing you
   - Stop / delete the running resource
   - For unknown EC2/RDS instances: Stop, then Terminate

2. **Check for unauthorized access:**
   - IAM → Users → check if there are users you didn't create
   - If yes, deactivate access keys immediately
   - Change your AWS root password
   - Enable MFA on root account (do this anyway!)

3. **Contact AWS Support:**
   - AWS Console → "Support" (top right)
   - Open a billing case
   - Explain you're a student/personal user and made a mistake
   - **AWS very often refunds first-time accidental charges**, especially for new accounts

---

## 🔐 Bonus: Enable MFA on Your Root Account

This is the single best security step you can take:

1. AWS Console → click your username (top right) → **"Security credentials"**
2. Under "Multi-factor authentication (MFA)" → **"Assign MFA device"**
3. Choose **"Authenticator app"** (Google Authenticator, Authy, etc.)
4. Scan the QR code with your phone
5. Enter two consecutive codes from the app

Now even if someone gets your password, they can't log in without your phone. ✅

---

## 📅 What Happens After 12 Months?

**Your S3 + CloudFront setup stays free!** 🎉

The "12-month free tier" applies to services like EC2 (virtual machines). The services you're using have **always-free** tiers that never expire:

- S3: 5 GB storage stays free forever
- CloudFront: 1 TB transfer stays free forever (the always-free tier was expanded in 2021)
- IAM, ACM: free forever for everyone

**As long as you stay within these limits**, your monthly bill is **$0.00 indefinitely.**

The only thing that might change:
- AWS could change their pricing (rare, but possible)
- You become viral and get 10M+ monthly visitors (good problem to have!)
- You add other paid services like Route 53 ($0.50/mo) or a custom domain

---

## 💡 If You Want EVEN MORE Safety

For maximum paranoia (totally optional):

1. **Set up an SCP (Service Control Policy)** to block all services except S3/CloudFront — only available with AWS Organizations
2. **Use a virtual credit card** (like Privacy.com) with a $5/month limit — if AWS tries to charge more, the card declines
3. **Set up multiple budget alerts** at $1, $5, $10, $25 — gives you progressively louder warnings

---

## 📞 Need Help?

- **AWS Free Tier FAQ:** https://aws.amazon.com/free/free-tier-faqs/
- **AWS Billing FAQ:** https://aws.amazon.com/aws-cost-management/aws-billing/
- **Stack Overflow:** Tag your question with `amazon-web-services`

You're going to be fine. 🛡️ Just follow this guide and you'll have a free, professional-grade hosting setup that you can confidently put on your resume. 🚀
