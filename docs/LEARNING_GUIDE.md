# Learning Guide

Start with `server/verification.js`: `verifyLoan` is the clearest expression of product value. Read each rule, then follow how `enrich` in `server/index.js` attaches those results to records.

Next read the routes in `server/index.js`. The `POST /api/loans` route is the full backend workflow: validate input, normalise types, create a record, add audit history, return an enriched result. `POST /api/loans/:id/action` demonstrates state transition and traceability.

On the frontend, `api` at the top of `src/main.jsx` is the request helper. `App` loads dashboard data with `useEffect`, manages the current screen and passes callbacks down. `NewLoan` submits the ingest form; `Detail` presents the verification result and triggers actions. `RecordTable` is shared by overview and queue.

Complete request-response example: clicking Create & verify invokes `NewLoan.submit` → `api('/loans', POST)` → Express creates the application → `verifyLoan` calculates checks → JSON returns → `done` loads dashboard, stores the returned record and opens `Detail`.

For debugging, run `npm run dev`, use the browser Network panel for API calls, and inspect the API terminal for server errors. Start by understanding the policy function and create route. You can ignore responsive CSS details and presentation components initially; they do not change core data flow.
