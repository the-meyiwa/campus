# Campus project status

## Agreed direction

Build a functional Student Campus App, not only an architecture presentation. Preserve the black, white, and Apple blue palette and all seven named creators on the About page. Keep the BU-SEN313 architecture study as supporting material. Repository: https://github.com/the-meyiwa/campus.

## Implemented and checked

- Course registration and drop; duplicate, clash, prerequisite and unit-limit checks.
- Timetable derived from saved registration; calendar export.
- Sample results with weighted GPA and CSV export.
- Profile editing and notification read status.
- Browser persistence, offline application cache, dark mode and demo session expiry.
- Repeatable build: `npm run build`; seven domain tests; asset and JavaScript checks.
- GitHub workflow builds on push and pull request and uploads the web artifact.

## Verification on 28 September 2026

Local build passed all seven tests. Browser checks opened dashboard, courses, timetable, results and profile without reported console errors. Saved profile survived reload. Earlier browser checks verified registration persistence, clash rejection, session expiry and app reload with the local server stopped.

## Production gaps — do not describe these as finished

The current app is a functional sample-data demo using browser storage. Demo entry is not secure authentication. There is no university API, backend database, cross-device synchronization or real push-notification delivery. The user has not supplied an API or selected a backend. Integration requires authoritative server validation, user-scoped data, secure sessions, idempotent registration, and a defined synchronization/conflict policy.

## Next work

Preserve existing functionality while connecting or building an agreed backend. Keep local/offline reads; move authoritative registration and identity to the server. Verify complete multi-device and session flows before claiming production readiness.
