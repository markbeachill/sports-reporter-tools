# Build assets (reference only)

The published site in `../docs/` is already built and served directly by GitHub
Pages — you do **not** need to run anything to publish it.

These files document how the HTML was generated from the original `.md` and
`.docx` sources (kept in `../source/`):

- `build.py` — converts the sources into the static site in `docs/`.
- `styles.css`, `app.js` — the site's stylesheet and behaviour (also copied into `docs/`).

To regenerate locally: edit the `SRC`/`OUT` paths near the top of `build.py`,
then `pip install python-docx markdown pyyaml && python3 build.py`.
