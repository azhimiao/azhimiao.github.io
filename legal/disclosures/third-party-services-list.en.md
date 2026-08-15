# Third-Party Services / SDK List

List only services actually enabled in production.

| Provider | Service | Data | Purpose | Region | Policy | Status |
|---|---|---|---|---|---|---|
| `None live in current beta` | Login/transactional email | Email, delivery status | Verification/notice | `[REGION]` | `[URL]` | Fill |
| `[PAYMENT_PROCESSOR]` | Payment | Order, amount, payment identifier | Pay/refund | `[REGION]` | `[URL]` | Fill |
| `[CRASH_PROVIDER]` | Crash diagnostics | Device/crash data | Reliability | `[REGION]` | `[URL]` | If enabled |
| `None` | Analytics | Minimal event data | Product analytics | `[REGION]` | `[URL]` | If enabled |
