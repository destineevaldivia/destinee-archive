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
- Works on desktop and phone
- Deployed

Out (for now):
- Final copy and images
- Animations
- Filtering by topic
- CMS

## Steps
| # | Step | Check | Status |
|---|---|---|---|
| 0a | Setup: `git init`, clear the Vite starter, first commit | site loads with name | done (after you commit) |
| 0b | Connect to GitHub: create an empty repo, add the remote, first push | repo page on github.com shows the files | to do |
| 1 | Layout shell + nav | visual vs `design/` | to do |
| 2 | Archive grid from a project data file | test: renders each project | to do |
| 3 | Project detail page + routing | test: clicking opens the right project | to do |
| 4 | About page | visual | to do |
| 5 | Phone-size pass | visual | to do |
| 6 | Deploy (Vercel or Netlify) | live URL works | to do |

**Open decisions** (to settle in the plan step where each comes up):
- Styling: plain CSS, CSS Modules, or Tailwind? (step 1)
- Data shape: what fields does a project have? (step 2)
- Routing: React Router or something lighter? (step 3)
- Images: in `public/` or imported? (step 2)
- Hosting: Vercel or Netlify? (step 6)

## Status
_Last updated: 2026-10-09_
- Current step: 0b
- Notes: Starter cleared; page shows the site name. `index.css` is empty
  until we pick styling in step 1. No `gh` CLI, so the GitHub repo gets
  created on the website.

## Decisions log
<!-- Context / Decision / Why. Newest at top. -->
- **Design reference:** Figma mockup is unfinished → export PNGs instead of
  Figma MCP → less setup; I make the design calls. Revisit MCP when the
  design is final.
