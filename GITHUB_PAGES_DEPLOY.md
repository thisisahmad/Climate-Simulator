# Step-by-step: Push code and go live on GitHub Pages (Deploy from a branch)

Do these in order. Replace `YOUR_USERNAME` with your GitHub username (e.g. `thisisahmad`).

---

## Part 1: Push your code to GitHub

### 1. Open terminal in the project folder

```powershell
cd D:\simulator\Climate-Simulator
```

### 2. Check git status

```powershell
git status
```

If it says "not a git repository", run:

```powershell
git init
git remote add origin https://github.com/YOUR_USERNAME/Climate-Simulator.git
```

### 3. Build the site for GitHub Pages (repo site URL)

Your live URL will be: `https://YOUR_USERNAME.github.io/Climate-Simulator/`

So the app must be built with base path `/Climate-Simulator/`:

**PowerShell:**

```powershell
cd frontend
$env:VITE_BASE_PATH="/Climate-Simulator/"
npm install
npm run build
cd ..
```

**Command Prompt (cmd):**

```cmd
cd frontend
set VITE_BASE_PATH=/Climate-Simulator/
npm install
npm run build
cd ..
```

### 4. Copy the built site into `docs/`

GitHub Pages "Deploy from a branch" can serve the `/docs` folder. Put the built files there.

**PowerShell (from project root `D:\simulator\Climate-Simulator`):**

```powershell
if (Test-Path docs) { Remove-Item -Recurse -Force docs }
New-Item -ItemType Directory -Path docs
Copy-Item -Path frontend\dist\* -Destination docs -Recurse
```

**Command Prompt:**

```cmd
if exist docs rmdir /s /q docs
mkdir docs
xcopy frontend\dist\* docs\ /E /I
```

### 5. Add, commit, and push

```powershell
git add -A
git status
git commit -m "Frontend-only app + docs for GitHub Pages"
git branch -M main
git push -u origin main
```

If push asks for login, sign in with your GitHub account (or a Personal Access Token).

---

## Part 2: Turn on GitHub Pages (Deploy from a branch)

### 6. Open your repo on GitHub

Go to: `https://github.com/YOUR_USERNAME/Climate-Simulator`

### 7. Open Settings

Click **Settings** (top right of the repo).

### 8. Open Pages

In the left sidebar, click **Pages** (under "Code and automation" or "Options").

### 9. Set source to "Deploy from a branch"

- Under **Build and deployment**, **Source**: choose **Deploy from a branch**.
- **Branch**: choose **main** (or the branch you pushed).
- **Folder**: choose **/ (root)** or **/docs**.
  - If you put the built site in **docs/** (step 4), choose **/docs**.
  - If you put it at repo root, choose **/ (root)**.
- Click **Save**.

### 10. Wait and open the site

- GitHub builds the site (usually 1–2 minutes).
- Your site will be at:
  - **https://YOUR_USERNAME.github.io/Climate-Simulator/**

Open that URL in your browser. The SME Resilience Simulator should load and run with no backend.

---

## When you change the app and want to update the live site

1. Build again with base path:
   ```powershell
   cd D:\simulator\Climate-Simulator\frontend
   $env:VITE_BASE_PATH="/Climate-Simulator/"
   npm run build
   cd ..
   ```
2. Copy build to `docs/` again (same commands as step 4).
3. Commit and push:
   ```powershell
   git add -A
   git commit -m "Update simulator"
   git push
   ```
4. GitHub will update the site automatically (may take 1–2 minutes).

---

## If your repo name is different

If the repo is not `Climate-Simulator` (e.g. `my-simulator`), then:

- Use base path `/my-simulator/` when building: `$env:VITE_BASE_PATH="/my-simulator/"`
- The live URL will be: `https://YOUR_USERNAME.github.io/my-simulator/`

---

## Troubleshooting

- **404 or blank page:** You chose the wrong folder in Pages (e.g. /docs vs / (root)). Match what you used in step 4.
- **Page loads but assets 404:** Base path is wrong. Rebuild with `VITE_BASE_PATH=/Climate-Simulator/` and copy to `docs/` again, then push.
- **Push denied:** Check you’re in `Climate-Simulator` (not `D:\simulator`) and that `origin` points to your repo: `git remote -v`
