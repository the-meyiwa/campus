# Campus

Campus helps students keep classes, tasks and personal progress together. Its palette is black, white and Apple blue. The About page credits the seven creators.

Run `npm start` and open http://127.0.0.1:4173. Enter a full name and choose Babcock, Covenant or ABUAD. Everyone can enter; no password or university account is required.

The workspace starts empty. Add courses and class times to build a timetable, track tasks, receive in-app reminders based on upcoming classes and deadlines, and enter scores for a weighted progress view. Students can edit or remove what they add, export their calendar, and download their data. Records persist in the browser and the app shell is cached for offline use after the first load.

Run `npm run build` to check JavaScript and assets, run tests, and produce `build/`. GitHub Actions performs the same build on each push.

This simple name-and-school entry is deliberately not secure authentication. Storage is local to the browser, so another device will not have the same records. Anyone entering the same name and school on a shared browser can open that workspace. Results are personal records, not official university results. A real university integration would require its API, secure identity, server storage and permissions.
