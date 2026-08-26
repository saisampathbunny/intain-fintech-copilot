# Architecture

The app is a small monorepo. `src/main.jsx` is the complete React single-page analyst experience; `src/styles.css` defines its responsive design. Vite proxies `/api` calls to the Express service while developing.

`server/index.js` owns HTTP routing, input validation, action handling, and the in-memory repository. `server/verification.js` is a pure business-logic module. Its `verifyLoan(loan)` function returns a status, numeric confidence score, policy metrics and structured findings. `server/data.js` supplies realistic initial records and audit entries.

Data flow: UI form → `POST /api/loans` → API validates minimal required ingest data → stores record → `verifyLoan` runs whenever the record is returned → React renders its findings. An analyst action travels to `POST /api/loans/:id/action`, updates the record and prepends an audit event.

The data repository is intentionally in memory for this hackathon demo. It is the single boundary to replace with a database adapter.
