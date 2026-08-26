# API Reference

All responses are JSON. Failed validation returns `{ "message": "…" }` with a 400 status; unknown records return 404.

## `GET /api/dashboard`

Returns `metrics`, `recentActivity`, and enriched `records`. Each enriched record contains `verification` (`status`, `score`, `issues`, `metrics`) and `audit`.

## `GET /api/loans`

Optional query parameters: `q` searches ID, borrower and product. `status` accepts `verified`, `attention`, `exception`, `review`, or `all`.

## `POST /api/loans`

Required input: `borrower`, `product`, `amount`. Optional inputs include `income`, `bureauScore`, `pan`, `declaredObligation`, `calculatedEmi`, `propertyValue`, `bankVerified`, and `documents`. A created enriched loan is returned with HTTP 201.

## `POST /api/loans/:id/action`

Body: `{ "action": "approve" | "reject" | "review", "note": "optional" }`. The record is updated and an audit event is created.
