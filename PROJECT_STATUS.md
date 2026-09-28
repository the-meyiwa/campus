# Campus project status

Campus is a student planner for a clearer campus day. Entry asks for full name and one of Babcock, Covenant or ABUAD. It accepts everyone and starts with empty records. A student adds courses, class times, tasks and personal scores. Home shows the next class and upcoming tasks. Updates derives reminders from real task deadlines and today's classes. Timetable, task completion, progress and exports use that information. The About page credits the seven creators.

The app is a static site. Records are saved in this browser under the chosen name and school. This is deliberately simple entry, not secure identity: another person entering the same details on a shared browser can open them. There is no cross-device sync or official university data. A future backend needs proper identity and authoritative university integration before those claims can be made.

Run `npm run build` to check source and tests and produce `build/`; `npm start` serves the source locally. The site uses the black, white and Apple blue palette. GitHub: https://github.com/the-meyiwa/campus.

The previously hosted site remains at https://campus-architecture-study.madselkie.chatgpt.site. This new version has not been published there: automatic approval review rejected sending the local source to that hosting destination. The current code and build are available in GitHub pending approval to update the site.
