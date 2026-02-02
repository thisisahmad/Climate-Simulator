# Deploy SME Resilience Simulator to GitHub Pages

The app is **frontend-only** (no backend). All simulation runs in the browser.

## Build

```bash
cd frontend
npm install
npm run build
```

Output: `dist/` (static files).

## GitHub Pages

1. Push the repo (e.g. `yourname/Climate-Simulator`).
2. **Settings → Pages**: Source = **GitHub Actions** or **Deploy from branch**.
   - If **branch**: choose branch (e.g. `main`), folder = `/ (root)` or `docs`; if using `dist/`, set branch to publish from a workflow that builds and copies `dist/` into the chosen folder, or build in CI and publish the `dist/` artifact.
   - Simpler: **Deploy from branch**, branch = `main`, folder = **/docs**. Then build locally with base for repo site (see below), and copy build output into `docs/` and commit (or use a GitHub Action to build and push to `docs/`).
3. **Base path** (if the site URL is `https://yourname.github.io/Climate-Simulator/`):
   ```bash
   VITE_BASE_PATH=/Climate-Simulator/ npm run build
   ```
   Then deploy the contents of `dist/` (e.g. copy to `docs/` and push, or use an action that builds with this env and deploys).

For **user/org site** (`https://yourname.github.io/`) use default base `/` and deploy `dist/` as the root (or `docs/` with index in root).

## Verify locally

```bash
npm run build
npx vite preview
```

Open the URL shown; the simulator should run with no API calls.
