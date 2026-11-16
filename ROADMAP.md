# Roadmap

Order matters: content quality and safety review come before more features.

## 1. Before any child uses it
- [ ] Teacher review of all English content (grammar, level, instructions for age 4–6)
- [ ] Vietnamese and Korean native-speaker review of `i18n.js` and mission glosses
- [ ] Cultural review of Tết and Chuseok missions (regional variation, wording)
- [ ] Test with real children in both modes; adjust reading load and step length
- [ ] Accessibility pass: screen reader, keyboard, contrast, 200% text size

## 2. Finish the building set (13 left)
Residential: Apartment Building, Family House
Education: English School, Art Studio, Science Lab
Community: Fire Station
Commercial: Grocery Store, Café
Culture: World Museum, Storytelling Theater
Environment: Recycling Center, Community Garden, Clean Energy Station
Each needs a mission (both modes), vi/ko text, art recipe, and a plot or a larger map.
Café (“I would like…”) and Grocery (numbers, money) are the best next English missions.

## 3. Deeper learning
- [ ] Spaced revisiting of earlier vocabulary inside later missions
- [ ] Advanced-level missions beyond Junior (longer reading, writing a short sentence)
- [ ] More cultures, written as everyday life and stories, not only festivals
- [ ] More personal-safety and emotional-awareness scenarios

## 4. Production
- [ ] Move to Vite + React as real dependencies; remove `shims/`
- [ ] Recorded audio by teachers or voice actors (replace browser speech)
- [ ] Optional speech practice: decide first whether recording a child's voice is acceptable; if yes, on-device only
- [ ] Tests: reducer, mission completion, persistence migration
- [ ] Storage migration plan when `v` changes
- [ ] Optional accounts and parent sync only with a privacy review (children's data law: COPPA, Korea PIPA, Vietnam)
- [ ] Hosting, analytics (none that identify children), error reporting
