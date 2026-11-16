# Little City Makers

Playable city-building game that teaches English, cultures and life skills to children aged 4–10.
Tagline: "Learn. Build. Belong." Tablet-first, responsive. Interface languages: English, Vietnamese, Korean.

## Commands

    npm install
    npm run build    # bundles src/ -> dist/ (open dist/index.html)
    npm run check    # content QA. Run after ANY change to data/missions.js, data/buildings.js or data/i18n.js
    npm test         # unit tests for src/state/store.js (tests/)

Run both before finishing a task. A task is not done if `npm run check` fails.

## Where things live

- `src/data/missions.js`  all learning content; the schema is documented at the top of the file
- `src/data/buildings.js` buildings, districts, plots, decorations
- `src/data/i18n.js`      every interface string, each with en / vi / ko
- `src/activities/steps.jsx` the seven step types (pick, order, type, choice, sort, learn, say)
- `src/state/store.js`    two layers: `root` (language, players, active player) and one `game` per player. Reducers, localStorage (key `little-city-makers.v2`), migration from v1. Bump `v` and migrate if the shape changes.
- `src/art/`              isometric toolkit, one drawing recipe per building, city map, characters
- `src/styles.css`        design tokens live in `:root`. Use tokens, never raw hex in components.
- `shims/` + `build.mjs`  prototype-only: React comes from a CDN. Remove when moving to a real framework.

## Product rules (these outrank decoration, engagement and shortcuts)

1. Every activity has a learning objective, target age, skill, interaction, success criteria and feedback. No activity exists only to earn points.
2. Two modes: Little Makers (4–6: visual, short, audio, drag/tap, minimal reading) and Junior Makers (7–10: sentences, reading, multi-step, real choices). Every mission needs steps for both. Never assume children of one age share one ability.
3. English is the teaching language. Vietnamese and Korean are support glosses only. They clarify meaning and never replace the English. All English must be natural and correct. Never show incorrect English as acceptable.
4. Culture: accurate, respectful, child-friendly. No stereotypes, no ranking of cultures, no reducing a culture to costumes, food or festivals. Say "many families" rather than "everyone". Keep real facts separate from game fiction. Characters are never defined by a cultural trait.
5. Values are taught through choices and consequences, never punishment or shame. A wrong choice shows what happens and offers "try another idea". Mistakes cost nothing.
6. Child safety. The only personal data is a nickname (max 14 characters) with a picture, stored on the device. The game never asks for a real name, address, school or phone number. Deleting a player needs the grown-up check. No chat, no live AI talking to children, no leaderboards, no purchases, no loot boxes, no streaks or guilt mechanics, no pushing for more screen time. The game is never presented as a human friend (Pip is a bird mascot). Content is predefined and teacher-reviewable.
7. Design consistency: keep the palette (sky blue, mint, butter yellow, soft coral, lavender on warm cream), rounded 2.5D toy look, large touch targets (44px minimum, 52px+ for primary), existing navigation and interaction patterns. Do not add a new theme or mechanic without a stated reason.
8. Technical integrity: no dead buttons, no fake features, never claim data is saved when it is not, handle empty and error states, respect `prefers-reduced-motion`, keep components reusable.

## Conventions

- New mission: add to `MISSIONS` with both `little` and `junior` steps and all of en/vi/ko, link it to a building, run `npm run check`.
- New building: entry in `BUILDINGS` plus a recipe in `ART` (`src/art/BuildingArt.jsx`). Each building is unlocked by exactly one mission.
- New interface string: add to `UI` in `i18n.js` with en/vi/ko. `npm run check` fails on a missing key.
- Mistakes in a step are never counted. Do not add scores, timers or lives.
- Vietnamese and Korean text must be reviewed by a fluent speaker before shipping. Flag new vi/ko strings in the PR description.
- Keep the Parent Dashboard honest: show only what is actually stored.

## Known limits (do not paper over these)

- Speaking steps are not recorded or assessed. The UI says so.
- Audio uses the browser speech voice. `src/audio/voice.js` picks the softest English voice the device has and speaks slowly; quality still depends on the device. Production needs recorded audio.
- Background music is generated live (`src/audio/music.js`, Web Audio, no files). It starts at the first tap, is quiet, ducks while the voice speaks, and has an on/off button (choice saved in `little-city-makers.audio`). Production may replace it with composed, licensed music.
- Players are local profiles in localStorage on one device. No accounts, no server, no sync between devices. There is no leaderboard by design (see rule 6); do not add one without an explicit decision from the owner and a privacy review.
- 11 of the 23 planned buildings exist (Café added). See ROADMAP.md.
