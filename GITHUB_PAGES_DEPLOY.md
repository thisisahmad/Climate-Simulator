# Step-by-step: Push code and go live on GitHub Pages (Deploy from a branch)

Do these in order. Replace `YOUR_USERNAME` with your GitHub username (e.g. `thisisahmad`).

---

## Option A: Deploy from a **different branch** (e.g. `gh-pages` or `live`)

Use this if you want the live site to come from a separate branch (e.g. `gh-pages` or `live`), not `main`.

### 1. Open terminal in the project folder

```powershell
cd D:\simulator\Climate-Simulator
```

### 2. Create and switch to the deploy branch

```powershell
git checkout -b gh-pages
```

*(You can use another name like `live` or `deploy` instead of `gh-pages`.)*

### 3. Build the site for GitHub Pages

```powershell
cd frontend
$env:VITE_BASE_PATH="/Climate-Simulator/"
npm install
npm run build
cd ..
```

### 4. Copy the built site into `docs/`

```powershell
if (Test-Path docs) { Remove-Item -Recurse -Force docs }
New-Item -ItemType Directory -Path docs
Copy-Item -Path frontend\dist\* -Destination docs -Recurse
```

### 5. Commit and push the deploy branch

```powershell
git add -A
git status
git commit -m "Build for GitHub Pages (gh-pages branch)"
git push -u origin gh-pages
```

*(Use your branch name if different, e.g. `git push -u origin live`.)*

### 6. Turn on GitHub Pages from this branch

1. Go to **https://github.com/YOUR_USERNAME/Climate-Simulator** → **Settings** → **Pages**.
2. **Source:** **Deploy from a branch**.
3. **Branch:** choose **gh-pages** (or your branch name).
4. **Folder:** **/docs**.
5. Click **Save**.

Your site will be at **https://YOUR_USERNAME.github.io/Climate-Simulator/**.

### 7. (Optional) Switch back to main for daily work

```powershell
git checkout main
```

When you want to update the live site: switch to the deploy branch, rebuild, copy to `docs/`, commit, push (see "When you change the app" below).

---

## Option B: Deploy from `main` branch

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

**If you use a separate deploy branch (e.g. `gh-pages`):**

1. Merge or copy your changes into the deploy branch, then:
   ```powershell
   git checkout gh-pages
   git merge main
   ```
   *(Or make your changes directly on `gh-pages`.)*
2. Build and copy to `docs/`:
   ```powershell
   cd frontend
   $env:VITE_BASE_PATH="/Climate-Simulator/"
   npm run build
   cd ..
   if (Test-Path docs) { Remove-Item -Recurse -Force docs }
   New-Item -ItemType Directory -Path docs
   Copy-Item -Path frontend\dist\* -Destination docs -Recurse
   ```
3. Commit and push the deploy branch:
   ```powershell
   git add -A
   git commit -m "Update simulator"
   git push origin gh-pages
   ```
4. Switch back to main if you use it for development: `git checkout main`.

**If you deploy from `main`:**

1. Build again with base path (same as above).
2. Copy build to `docs/` again.
3. Commit and push to main: `git add -A`, `git commit -m "Update"`, `git push`.

GitHub will update the site automatically (may take 1–2 minutes).

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
