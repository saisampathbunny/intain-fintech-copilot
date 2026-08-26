# Verity — Loan Data Verification Copilot

Verity is a full-stack prototype for the INTain FinTech Challenge 2026 Round 2, Full Stack track. It turns raw loan-application data into a traceable verification decision: data is ingested, checked against core policy and completeness rules, surfaced as explainable exceptions, and routed for an analyst action.

## Key features

- Real React frontend communicating with an Express API
- Loan application ingestion with server-side validation
- Automated completeness, PAN-format, credit-score, FOIR, EMI-mismatch and home-loan LTV checks
- Verification queue, search and status filters
- Record-level evidence, metrics, explainable findings and audit trail
- Approve, reject, or send-for-review actions that persist during the running session
- Realistic pre-seeded demo scenarios

## Stack and architecture

React + Vite provides the responsive analyst workspace. Express exposes REST endpoints and contains the policy engine. The prototype uses an in-memory JSON seed repository deliberately: it enables a zero-setup demo and makes the model easy to study; replacing `server/data.js` with a database repository is isolated work.

```
Browser (React) → /api proxy → Express API → verification.js → seeded data / audit log
```

## Folder structure

```
src/                 React UI and styles
server/              API, seeded data and verification rules
docs/                Architecture, API and learning notes
```

## Setup

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. The API runs at `http://localhost:4000`.

There are no environment variables or credentials required for the prototype. For a production build:

```bash
npm run build
npm run start
```

## Main workflow

1. Open Overview to see live workload and priority exceptions.
2. Open Verification queue and select an application.
3. Inspect the confidence score, machine-readable findings, source facts and audit history.
4. Take a review, reject or approve action.
5. Use New verification to submit a new application and immediately view its verification outcome.

## API overview

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/dashboard` | Dashboard metrics and records |
| GET | `/api/loans?q=&status=` | Searchable/filterable verification queue |
| GET | `/api/loans/:id` | Record and audit details |
| POST | `/api/loans` | Ingest and automatically verify a loan |
| POST | `/api/loans/:id/action` | `approve`, `reject`, or `review` a record |

## 5-MINUTE DEMO FLOW

1. Start on **Overview**: point out the queue, automatic verification rate, priority exceptions, and the clear portfolio readiness signal.
2. Select **Vikram Singh** from Priority exceptions: show missing PAN/bank evidence and the policy findings that block straight-through processing.
3. Select **Priya Shah** from the queue: explain how a reviewer can inspect FOIR, documents, and audit history before taking action.
4. Click **New verification** and enter a new applicant. Deliberately leave PAN empty or use a bureau score below 700.
5. Submit: show that the API ingests it, the engine evaluates it, and the detailed exception result appears immediately.
6. Approve/send a record to review and show the audit trail and dashboard counts updating.

## Limitations and next steps

The demo repository resets on server restart; no authentication, document OCR, external bureau/bank integrations, or durable database is included. Next steps are PostgreSQL persistence, role-based authentication, actual document uploads/OCR, configurable policy rules, and event-based audit storage.
