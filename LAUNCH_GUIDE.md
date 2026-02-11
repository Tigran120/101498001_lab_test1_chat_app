# How to Launch the Chat App (for Screenshots / Video)

Follow these steps to run the project on your computer so you can take screenshots or record a video for D2L.

---

## What you need first

1. **Node.js** – If you don’t have it: download from [nodejs.org](https://nodejs.org) (LTS version). Install it, then close and reopen your terminal.
   - To check if it’s installed: open a terminal and type `node -v` and `npm -v`. You should see version numbers (e.g. `v20.10.0` and `10.2.0`).
2. **MongoDB** – The app stores users and messages in MongoDB. You need it running locally or use a cloud URI (see below).

---

## Step 1: Install MongoDB (if you don’t have it)

**Option A – MongoDB on your PC**

- Download MongoDB Community from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community).
- Install it and leave the default port **27017**.
- Start the MongoDB service: open **Services** (Win + R → type `services.msc` → Enter), find **MongoDB Server**, right‑click → Start. Or open a terminal and run `mongod` (leave that window open).
- The app will connect to `mongodb://localhost:27017/chat_app` by default.

**Option B – MongoDB Atlas (cloud, no local install)**

- Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
- Create a free cluster and get the connection string (Cluster → Connect → Connect your application → copy the URI).
- Replace `<password>` in the URI with your database user’s real password. If the password has special characters, you may need to URL‑encode them.
- In Atlas: Network Access → Add IP Address → “Allow Access from Anywhere” (0.0.0.0/0) so your app can connect. You’ll use this URI in Step 3 as `MONGODB_URI`.

---

## Step 2: Open the project folder in terminal

- Open **Command Prompt** or **PowerShell** (Win + R → type `cmd` or `powershell` → Enter).
- Go to the project folder. The folder should be the one that contains `server.js`, `package.json`, and the `view` folder.
  - Example path: `C:\Users\Asus\Desktop\LabTest_COMP3133`
  - To get the path: in File Explorer, go to the project folder, click the address bar, copy the path, then in the terminal type `cd ` and paste (e.g. `cd C:\Users\Asus\Desktop\LabTest_COMP3133`).
- Press Enter. Your terminal prompt should now show that folder path.

---

## Step 3: Install dependencies and start the server

Run:

```bash
npm install
```

- You should see lines like “added 111 packages” and “found 0 vulnerabilities”. That’s normal. This only needs to be done once (or again if you delete the `node_modules` folder).

Then start the app:

**If MongoDB is on your PC (localhost):**

```bash
npm start
```

**If you use MongoDB Atlas:** set the connection string and then start:

- **PowerShell:**
  ```powershell
  $env:MONGODB_URI="mongodb+srv://YOUR_USER:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/chat_app"
  npm start
  ```
- **Command Prompt:**
  ```cmd
  set MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/chat_app
  npm start
  ```

You should see something like: **Server running on http://localhost:3000**

- Leave this terminal window open while you use the app. The server is running there; if you close it or press Ctrl+C, the app will stop.
- To stop the server when you’re done: in that terminal press **Ctrl+C**.

---

## Step 4: Open the app in your browser

1. Open **Chrome**, **Edge**, or **Firefox**.
2. In the address bar type: **http://localhost:3000** (or copy‑paste it) and press Enter.
3. You should see the **Login** page (username and password fields, plus a “Sign up” link). If you see “Cannot connect” or a blank page, check that the server is still running in the terminal.

---

## Step 5: Use the app and take screenshots

Do this in order so your screenshots tell the whole story:

1. **Sign up**
   - Click **Sign up** (or go to `http://localhost:3000/signup.html`).
   - Enter a **username** (must be unique; e.g. `user1`), **first name**, **last name**, and **password** (at least 4 characters).
   - Click **Sign up**. You should be redirected to the login page.
   - **Screenshot:** The signup form (before or after success). Use **Win + Shift + S** (or Snipping Tool) to capture.

2. **Login**
   - You should be on the login page. Enter the same username and password.
   - Click **Log in**.
   - **Screenshot:** Login page or the chat page right after login.

3. **Join a room and chat**
   - On the chat page, click one of the rooms (e.g. **devops** or **sports**).
   - Type a message and click **Send**.
   - **Screenshot:** Chat page with the room selected and at least one message visible.

4. **Typing indicator**
   - Open a **second** tab or window: either a new window in the same browser, or use a different browser (e.g. Chrome + Edge), or an **Incognito/Private** window so you get a separate session.
   - In the second window go to `http://localhost:3000`, sign up with a *different* username (e.g. `user2`), log in, and join the **same room** as the first user (e.g. both in **devops**).
   - In the **first** window start typing in the message box (don’t press Send). After a moment, in the **second** window you should see “**user1 is typing...**” (or whatever the first user’s name is) near the message area.
   - **Screenshot:** The second window showing the typing message. If it disappears quickly, type slowly or pause; the indicator shows while you’re typing and hides shortly after you stop.

5. **Leave room / Logout (optional but good)**
   - Click **Leave room** and/or **Logout**.
   - **Screenshot:** Optional – e.g. back at login page after logout.

---

## Step 6: (Optional) Record a short video instead of screenshots

- **Windows:** Win + G to open Game Bar → click Record (or use **Xbox Game Bar** from the Start menu). Or use **OBS** (free) or **Snipping Tool** (Win + Shift + S → record).
- **Quick script:** Open app → login → join a room → send a message → open second window, second user joins same room → first user types (show “typing…” in second window) → logout.
- Keep it under 1–2 minutes. Save the video and upload it to D2L with your submission.

---

## If something doesn’t work

- **“Cannot connect to MongoDB”** – (Local) Check that the MongoDB service is running (Services → MongoDB Server). (Atlas) Check the connection string, that you replaced `<password>`, and that Network Access allows your IP (or 0.0.0.0/0 for testing).
- **“npm not found”** or **“node not found”** – Install Node.js from nodejs.org, then close and reopen the terminal so the PATH updates.
- **Port 3000 already in use** – Another program is using 3000. Either close it or use a different port. In **Command Prompt**: `set PORT=3001` then `npm start`. In **PowerShell**: `$env:PORT=3001` then `npm start`. Then open **http://localhost:3001** in the browser.
- **Page is blank or “Cannot GET”** – Confirm you’re going to `http://localhost:3000` (not https). Refresh the page. Make sure the server terminal is still running and shows no errors.
- **Signup says “Username already taken”** – Pick a different username, or (if you’re testing) use a new one each time (e.g. user1, user2).

Once the app is running and you have your screenshots (or video), use the **SUBMISSION_GUIDE.md** to submit on D2L.
