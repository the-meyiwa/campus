# Campus — BU-SEN313

An academic architecture study, using black, white, and Apple blue (#0071e3).

Run `npm start` and open http://127.0.0.1:4173. No dependency installation is required. Use “Enter demo workspace” to begin.

Run `npm run build` to validate all JavaScript, verify page assets, run the tests, and produce a deployable `build/` folder. `npm test` runs the domain tests separately. GitHub Actions runs the build on each push and pull request and saves the output as a downloadable artifact. Sites continues to serve the identical assets from `dist/`.

The working demo supports registration/drop with clash, prerequisite and unit-limit validation, a derived timetable, calendar export, sample results with weighted GPA and CSV export, read/unread notifications, editable profile, light/dark/system themes, and a 30-minute demo session. Local browser storage persists records and drafts; a service worker caches the app for offline reloads after the first successful load. Other tabs on the same origin receive storage updates (last save wins).

This is a self-contained sample-data demo: there is no real university authentication, backend integration, push delivery, or cross-device synchronization. A demo session is not a security boundary. Do not enter sensitive student information. The architecture study and all seven creator credits remain accessible in the footer.

Run `node --test core.test.cjs` for domain and persistence checks. Source responsibilities: `dist/core.js` handles data/rules; `dist/app.js` handles UI and session orchestration; `dist/study.js` preserves the assignment; `dist/sw.js` provides offline caching. For real deployment, replace the local repository with authenticated server APIs, authoritative validation and idempotent writes.
