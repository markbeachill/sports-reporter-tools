# Sports Reporter Tools

A documentation library of AI analysis and tutoring tools for sports writing
(match reports and previews), with the design notes and working papers behind them.

**Live site:** https://markbeachill.github.io/sports-reporter-tools/

## What's here

- **Tools (prompts)** — SR1, SR2, SR3: copiable AI prompts. Open a tool page and
  press **Copy prompt** to copy the full prompt, then paste it into an AI assistant.
- **Papers** — working papers on the model and how it was built and tested.
- **Design Discussion** — the running design notes (parts 2–6 + rationale).
- **Logs** — test records.

## How it's built

The site is plain static HTML/CSS/JS in `docs/` — **no build step is required to
serve it**. GitHub Pages serves the `docs/` folder directly. A `.nojekyll` file is
included so Pages serves the files as-is.

The HTML was generated from the source `.md` and `.docx` files with `build.py`
(kept at the repo root for reference). The raw prompt files live in
`docs/prompts/` so the **Copy prompt** buttons fetch the real source.

### Publishing on GitHub Pages

1. Push this repo to `https://github.com/markbeachill/sports-reporter-tools`.
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source: Deploy from a branch**.
4. Choose **Branch: `main`** and **Folder: `/docs`**, then **Save**.
5. The site publishes at the URL above (give it a minute on first deploy).

No Actions workflow or build command is needed.
