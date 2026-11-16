# Little City Makers — playable prototype

"Learn. Build. Belong." A city-building English and life-skills game for children aged 4–10.

## Run

    npm install
    npm run build     # writes dist/index.html, dist/app.js, dist/styles.css
    npm run check     # content QA: missions solvable, translations complete, UI keys exist

Open `dist/index.html` in a browser. React 18 is loaded from a CDN in this prototype build
(see `shims/`); for production, remove the alias in `build.mjs` and install `react`/`react-dom`.

## Structure

    src/
      main.jsx, App.jsx        app shell: state, persistence, screen switching
      state/store.js           one JSON state object, reducer, localStorage, selectors
      data/missions.js         all learning content (mission schema documented at the top)
      data/buildings.js        buildings, districts, plots, decorations
      data/i18n.js             interface strings in English, Vietnamese, Korean
      activities/steps.jsx     the seven step types: pick, order, type, choice, sort, learn, say
      screens/Pages.jsx        Welcome, Mission Center, Achievements, Parent Dashboard
      screens/City.jsx         City Map, Construction Mode, building panel, parent gate
      screens/MissionPlayer.jsx  intro -> steps -> reward (missions and in-building practice)
      art/                     isometric toolkit, building recipes, city map, characters
      components/ui.jsx        icons, audio helper, modal, top bar, meter
      styles.css               design tokens (:root) and all styling

## Adding content

- New mission: add an entry to `MISSIONS` (both `little` and `junior` steps) and run `npm run check`.
- New building: add an entry to `BUILDINGS` and a drawing recipe to `ART` in `art/BuildingArt.jsx`.
- New language: add a column in `data/i18n.js` and glosses in `data/missions.js`.

## Honest limits of this prototype

- Speaking steps are prompts only. Nothing is recorded or checked.
- Audio uses the browser's built-in speech voice; Listen buttons hide when no voice exists.
  Production should use recorded audio by teachers or voice actors.
- Players are local profiles (nickname + picture) on one device, saved in `localStorage`. There are no accounts, no passwords and no server, so progress does not sync between devices and there is no shared ranking.
- Content was written for this prototype and still needs review by teachers and by
  Vietnamese and Korean cultural reviewers before use with children.
- The parent gate (a multiplication question) keeps small children out; it is not security.
- 10 of the 23 buildings in the product concept are built. The rest need missions and art.
