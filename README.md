# Node.js Academy — by Escort Tech Hub (ETH)

An interactive, docs-style learning platform for Node.js — basic to advanced —
built with plain HTML, CSS, and JavaScript. Founded and developed by **Shaik Lalu Basha**.

## What's inside

```
eth-nodejs-platform/
├── index.html              # About / homepage (nodejs.org-style About page)
├── playground.html         # Free-form live code editor + console
├── render.yaml              # One-click Render static site config
├── css/
│   └── style.css            # All styling, design tokens, animations
├── js/
│   ├── codeblock.js         # Syntax highlighter + code-block HTML (used in browser AND by the build script)
│   ├── sandbox.js           # In-browser Node.js execution engine (real JS + shimmed core modules)
│   ├── lessons-data.js      # ⭐ The entire curriculum lives here — edit this to add/change lessons
│   └── main.js               # Shared topbar/sidebar/footer + "Run" button wiring
├── lessons/                  # 26 generated lesson pages (one per topic)
└── build/
    └── gen-lessons.js       # Node script that generates /lessons/*.html from lessons-data.js
```

## How the "live execution" works

Every code block has a **Run** button. Clicking it sends the code straight into
`ETHSandbox.run()` (in `js/sandbox.js`), which:

1. Executes the code for real in the browser's JavaScript engine using `new Function(...)`
   — so plain JS (variables, functions, loops, promises, async/await, closures) is
   genuinely evaluated, not faked.
2. Provides a `require()` shim for the Node.js core modules that a static site can't
   really access (`fs`, `http`, `path`, `os`, `events`, `util`, `crypto`) so lessons about
   those modules still run and produce accurate, deterministic output.
3. Captures everything sent to `console.log/info/warn/error` and streams it into the
   on-page console panel line-by-line, so editing code and re-running genuinely
   changes what you see — this satisfies the "show execution changing" requirement.

`express-intro.html` is intentionally marked **not runnable** (`runnable: false`)
because Express is a real npm package that can't run inside a static browser sandbox —
the lesson explains this and shows the exact code you'd run locally after `npm install express`.

## Editing the curriculum

Everything about every lesson — title, explanation text, code sample, difficulty,
reading time, group — lives in **`js/lessons-data.js`** as one array. To add a new
lesson:

1. Add a new object to the `ETH_CURRICULUM` array in `js/lessons-data.js`.
2. Run the generator:
   ```bash
   node build/gen-lessons.js
   ```
3. The new page appears in `/lessons/`, and the sidebar on every page updates
   automatically (the sidebar is rendered from the same data file at runtime).

## Local preview

No build tooling is required to view the site — it's static HTML/CSS/JS. From the
project folder, run any static file server, for example:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open `http://localhost:8080` (or the port shown).

⚠️ Opening `index.html` directly via `file://` will NOT work correctly, because the
pages load `js/lessons-data.js` etc. via relative `<script src>` paths that some
browsers restrict under `file://`. Always serve it over HTTP, even locally.

## Deploying to Render

1. Push this folder to a GitHub/GitLab repository.
2. In the Render dashboard: **New → Static Site**.
3. Connect the repository.
4. Build command: leave blank or `echo "no build"` (there's nothing to compile).
5. Publish directory: `.` (the project root).
6. Deploy — Render will serve `index.html`, `playground.html`, and every file under
   `/lessons`, `/css`, and `/js` directly at their paths.

The included `render.yaml` lets you deploy with **Render Blueprints** instead of
clicking through the dashboard manually — Render will detect it automatically.

## Branding

All copyright and footer text reads:

> © Escort Tech Hub (ETH). All rights reserved.
> Founded & developed by Shaik Lalu Basha

Update the year, org name, or founder credit in `js/main.js` → `footerHTML()`
and in the founder card on `index.html` if anything changes.
