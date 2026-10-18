# Walkthrough — Destinee Archive

Your guide: how a session runs, what each command does, the MVP plan, and
what's been decided. `CLAUDE.md` is the rulebook for Claude; this file is yours.

---

## Starting a session
Open two Terminal tabs (Cmd+T for the second):

| Tab | Command | What it does |
|---|---|---|
| 1 | `cd ~/src/destinee-archive && npm run dev` | Starts the local site at localhost:5173; it auto-refreshes on save |
| 2 | `cd ~/src/destinee-archive && claude` | Starts Claude Code in this project |

First prompt every session:
> Read walkthrough.md. Where are we, and what's the next step? Plan only.

## The loop (one step at a time)
1. **Plan:** Shift+Tab into plan mode, then ask for the plan. No edits happen.
2. **Discuss:** question it, rename things, push back if it over-builds.
3. **Go:** say "go" explicitly.
4. **Review:** read its diff explanation. Check the browser against `design/`.
5. **Touch it:** change one small thing by hand (a name, a value). It's how
   you learn the code.
6. **Commit:**
   ```
   git status        # see what changed
   git diff          # read the actual changes (q to quit)
   git add -A        # stage everything
   git commit -m "feat(grid): render projects from data file"
   ```
7. **Update** the Status and Decisions sections below.

## Connecting to GitHub
```
# 1. On github.com: New repository → "destinee-archive"
#    Leave README, .gitignore and license unchecked (an empty repo avoids a merge on first push)
git remote add origin <repo URL>   # tell git where GitHub lives, under the name "origin"
git push -u origin main            # upload your commits; -u remembers origin as the default
```

## Branch workflow (bigger changes)
Small fixes: commit straight to `main`. Bigger work (animations, new
features): use a branch and check its Vercel preview first.
```
git switch -c feat/splash-animation   # new branch, named type/what
# ...build, commit as usual...
git push -u origin feat/splash-animation
gh pr create --fill                   # open a pull request; Vercel posts a preview link on it
# check the preview URL; push more commits if needed (preview updates)
gh pr merge --squash --delete-branch  # one tidy commit on main, branch removed
git switch main && git pull           # bring your local main up to date
```

## When something's off
| Symptom | Do this |
|---|---|
| It's heading the wrong way | Press **Esc** right away, then redirect |
| Same mistake twice | `/clear`, then one clear prompt including what you learned |
| It over-built | "Simpler. Remove X." Point at the YAGNI rule |
| Stuck between approaches | "Give me two options and the trade-off." You pick |
| Session feels long or muddy | `/clear` and restart with the first prompt above |

---

## MVP scope
**MVP = functional, not finished.** A live site with real structure and
placeholder content.

In:
- Home with an archive grid
- Project detail page
- About page
- Nav
- Intro splash (title for a few seconds, then home)
- Works on desktop and phone
- Deployed

Out (for now):
- Final copy and images
- Animations
- Filtering by topic
- CMS
- Illustrated splash: illustrations floating around the title. Needs its
  own design and an illustration strategy first.

## Steps
| # | Step | Check | Status |
|---|---|---|---|
| 0a | Setup: `git init`, clear the Vite starter, first commit | site loads with name | done |
| 0b | Connect to GitHub: create an empty repo, add the remote, first push | repo page on github.com shows the files | done |
| 1 | Layout shell + nav | visual vs `design/` | done |
| 2a | Project list from a data file | test: renders each project | done |
| 2b | Click-to-advance image carousel | test: first image, next, wraps, single image | done |
| 3 | Project detail page + routing | test: clicking opens the right project, unknown slug | done |
| 3b | Intro splash: title centered for a few seconds, then home | test: shows, hands over, click skips, project URL skips | done |
| 4 | About page | test: nav opens About, contact links, email copies; visual | done |
| 5 | Phone-size pass | visual in DevTools (375, 390–430, 768) | done |
| 6 | Deploy on Vercel | live URL works, direct visits/reloads, fonts, real phone | done |

**MVP complete.** Next is **V0**, built with the same loop, in this order:
1. Logo work
2. Splash page animation
3. Real content (projects and images)
4. About page

## Status
_Last updated: 2026-10-18_
- Live: https://destinee-archive.vercel.app (auto-deploys on push to `main`; tests gate each deploy)
- Current step: MVP done
- Notes: Visits to `/` open with a 2.5s splash (click or key skips).
  Titles open `/projects/<slug>`; one shared page for now. Nav and titles
  fade on hover. About has placeholder bio, 4 contacts and an empty space
  reserved for a future animation. Below 840px, rows and contacts stack
  and the title shrinks to 36px. Colors are eyeballed; swap in exact hex
  from Figma. `design/Hero.png` removed (export was blank).
  **To check:** Adobe Fonts may restrict domains. If the title falls back
  to a plain serif (localhost or the live site), add the domain in the web
  project on fonts.adobe.com.

## Decisions log
<!-- Context / Decision / Why. Newest at top. -->
- **Wayfinding:** On phones nothing hovers, so links and position weren't
  obvious → titles end in `→` (Minion glyph), carousel shows `1/4` with the
  current number lighter, nav marks the current page lighter (Home stays
  marked on project pages) → visitors always know what's tappable and
  where they are. A hand-drawn arrow may replace `→` in V0.
- **Hosting:** Vercel (Hobby, free `.vercel.app` URL) with `vercel.json`:
  tests run before every build, all paths rewrite to `index.html` → broken
  tests never go live, direct links work. Hobby is non-commercial only;
  revisit if the site ever sells work. Custom domain later.
- **Branch workflow:** Small fixes to `main`; bigger work on a branch →
  PR → Vercel preview → squash-merge → test changes before they're public,
  one tidy commit per change.
- **Phone layout:** Desktop row needs ~789px → one media query at 840px:
  rows stack (dots, image, text), contacts stack, title 36px, 20px side
  padding everywhere → no sideways scroll on phones or upright tablets.
- **About contacts:** Reuse the carousel dots → one shared `.dot` class;
  Instagram/LinkedIn open new tabs, email copies to clipboard and shows
  "Copied" for 2s; Tab-only keyboard → no mail-app surprise, dots stay
  identical across the site.
- **Splash:** Illustrated version isn't designed yet → MVP is the title
  alone for 2.5s, then a 0.5s fade; only when a visit starts at `/`; click
  or key skips → shared project links open directly, repeat visitors aren't
  stuck waiting.
- **Routing:** Project pages need URLs and the splash must play once per
  visit → React Router (v8), `/projects/:slug` → pages switch without
  reloading the site.
- **Project page:** No Figma frame; each project's page will be shaped by
  its content later → one shared `ProjectPage` (title, description, all
  images) for now → no guessed fields.
- **Nav:** Home already lists every project and titles link to their pages
  → nav is Home · About, "Project Archive" dropped (differs from
  `Home.png`) → no duplicate list page.
- **Carousel:** Rows preview several images → click the image to advance,
  wrap to the first, dots are indicator only, no dots for a single image →
  simplest control that works by keyboard too.
- **Project data:** `slug`, `title`, `year`, `description`, `images` in
  `src/projects.js`; images in `public/projects/` as path strings → adding a
  project is a folder plus one entry; revisit if it needs to scale.
  `images` = row preview; full page fields get decided in step 3.
- **Styling:** Small, minimal site → plain CSS in `index.css` with color
  variables → no new tools; split into files only if it grows.
- **Fonts:** Nav in Italiana (Google Fonts); site title in Erotique
  Alternate, project titles in Minion Pro Subhead, body in Minion Pro (Adobe
  Fonts kit) → loaded via `<link>` in `index.html`, no npm packages. Tried
  Inter for body, preferred the serif.
- **GitHub auth:** HTTPS push failed on a stale saved password → installed
  `gh` CLI and signed in via browser → no tokens to create or manage by hand.
- **Design reference:** Figma mockup is unfinished → export PNGs instead of
  Figma MCP → less setup; I make the design calls. Revisit MCP when the
  design is final.
