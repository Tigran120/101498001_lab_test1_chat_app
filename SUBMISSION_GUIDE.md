# How to Submit Your Lab Test (COMP3133 Lab Test 1)

Follow these steps so you don’t miss anything.

---

## 1. Create the GitHub repository

- Go to [GitHub](https://github.com) and sign in.
- Click **New repository**.
- **Repository name:** `studentID_lab_test1_chat_app`  
  → Replace **studentID** with your actual student ID (e.g. `101498001_lab_test1_chat_app`).
- Choose **Public**.
- Do **not** tick “Add a README” (you already have one).
- Click **Create repository**.

---

## 2. Push your code to GitHub

On your computer, in the project folder (`LabTest_COMP3133`):

1. Open terminal/command prompt in that folder.
2. If this folder is **not** a git repo yet, run:
   ```bash
   git init
   ```
3. Add the remote (use your real repo URL):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/studentID_lab_test1_chat_app.git
   ```
4. Add and commit:
   ```bash
   git add .
   git commit -m "Lab Test 1 - Chat app submission"
   ```
5. Push (first time you might need to set the branch and push):
   ```bash
   git branch -M main
   git push -u origin main
   ```

**Important:** Your instructor expects to see **regular commits** in the repo, not a single upload. If you make more changes, commit and push again before the deadline.

---

## 3. Prepare what you’ll upload to D2L

You need **three** things in your D2L submission:

| What | How |
|------|-----|
| **1. ZIP of your code** | Zip the whole project folder. **Exclude** the `node_modules` folder (right‑click → delete before zipping, or don’t include it). |
| **2. GitHub link** | Copy the URL of your repo (e.g. `https://github.com/username/101498001_lab_test1_chat_app`). You’ll paste this in the D2L submission. |
| **3. Proof it works** | Either **screenshots** (signup, login, chat in a room, typing indicator) **or** a **short video** showing the app working. |

---

## 4. Submit on D2L

- Deadline: **11 Feb 2026, 8:00 PM**
- Go to the **COMP3133** course on D2L and open the **Lab Test 1** assignment.
- **Upload the ZIP file** (your source code).
- In the **comments/text** area (or wherever your instructor asked), **paste your GitHub repository link**.
- **Upload your screenshots or video** (evidence that the app runs and has the required features).
- Submit the assignment.

---

## 5. Checklist before you hit Submit

- [ ] GitHub repo name is `studentID_lab_test1_chat_app` (your real student ID).
- [ ] Code is pushed to GitHub and you see your commits.
- [ ] ZIP contains your code **without** `node_modules`.
- [ ] GitHub link is included in the D2L submission.
- [ ] Screenshots or video are attached to the same D2L submission.

**Reminder:** No email submissions. Only D2L. Good luck.
