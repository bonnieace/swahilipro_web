# Bedrock gateway v1

This adds the first text-only provider adapter to the existing Firebase account,
client grant and credit backend. It does not yet implement the local coding agent,
tool execution, compiler CLI commands or VS Code chat participant.

## Deployment configuration

Keep `BEDROCK_ENABLED=false` until testing the exact model in your AWS account.
Supply server-only AWS credentials using the SDK default credential chain (role,
mounted credentials, or AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY). Never ship them
in client bundles. Scope IAM permissions to the approved resources and actions:
`bedrock:CountTokens` and `bedrock:InvokeModelWithResponseStream`. Inference profiles
may require permissions on their underlying model resources as well.

Set `BEDROCK_MODELS_JSON` to an array of up to ten model policies. Example schema
(the ID and rates below are placeholders, not an enabled or priced model):

```json
[{
  "id": "REPLACE_WITH_VERIFIED_MODEL_ID",
  "name": "Your model",
  "region": "us-east-1",
  "api": "converse",
  "billingVerified": true,
  "inputMicrocreditsPerToken": 2,
  "outputMicrocreditsPerToken": 3,
  "inputNanodollarsPerToken": 2000,
  "outputNanodollarsPerToken": 3000,
  "maxInputTokens": 32000,
  "maxOutputTokens": 4096
}]
```

Verify model access, ConverseStream, exact CountTokens support, region, output
bounds and the actual billing schedule before setting billingVerified. CountTokens
has no estimate fallback: unsupported models are rejected before invocation.
The adapter permits only ordinary text input/output with input/output token billing.
Tools, images, caching, reasoning content and extra billing modes are unsupported.
An unexpected provider mode fails the stream and retains uncertain holds.
This does not promise that Grok, Kimi or every Bedrock model supports this contract.

Microcredits are integer account units, with no hard-coded USD conversion. Choose
rates that cover all relevant provider costs and choose a positive integer
`BEDROCK_DAILY_MICROCREDIT_CAP`. Snapshot rates apply to each reservation. The
UTC daily global budget includes held reservations plus settled charges, and is
charged to the request's original day. Limits are two active/uncertain requests
per account, 100 starts/account/day and 1,000 starts globally/day. Failed counted
requests without reservations do not consume these start limits. Disable the flag
to stop new calls; it does not stop calls already running. AWS account budgets and
network-edge rate limits remain separate operational controls.

Deploy firestore.indexes.json, deny-all firestore.rules, and the existing Firebase
credentials. Keep proxy buffering disabled for SSE and allow connections at least
90 seconds. Coolify standalone Node hosting is supported; this is not an Edge route.

## Client contract

Use the existing browser-issued access token with inference:invoke permission.
Cookie-authenticated POST also requires the configured Origin. No Firebase ID token
or AWS credential is accepted from native clients.

- GET /api/v1/models returns availability, prices and text-only capabilities.
- POST /api/v1/inference requires application/json and Idempotency-Key (16–128
  characters, letters/digits/underscore/hyphen). Maximum body is 64 KiB.
- GET /api/v1/requests/{id} is owner-scoped and reports the durable credit state.

Example body:

```json
{"model":"VERIFIED_MODEL_ID","messages":[{"role":"user","content":"Explain this code"}],"maxOutputTokens":1024}
```

Optional system is a string; messages are user/assistant text. First and last
messages must be user. The normalized input is hashed for idempotency. The server
stores no prompt or generated response text, so clients retain their transcripts.
SSE uses `data: {"version":1,...}` frames, with event types request.started,
text.delta, usage, request.completed, request.failed. Errors before streaming are
ordinary JSON HTTP errors. Stream failures are terminal events even with HTTP 200.
A duplicate POST returns HTTP 202 JSON with request ID/state and never invokes
again; response replay is unavailable. On ambiguous disconnect, query status with
the original ID/key rather than using a new key automatically.

## Credits and recovery

Token counting precedes credit reservation. The reservation covers counted input
plus the configured maximum output, and a transaction claims invocation once.
AWS SDK invocation retries are disabled. Final usage is persisted before a second
transaction charges the actual amount and releases the unused reservation.
Cancellation before invocation releases the hold; after invocation, cancellation
or missing usage leaves an unknown state. A hold is not proof of a finalized charge.

Schedule POST /api/internal/reconcile every minute, authenticated with the existing
server-only INTERNAL_JOB_TOKEN. Each batch scans up to 50 expired reserved/invoking
requests and 50 unknown requests with confirmed usage. Unstarted reservations after
two minutes are released atomically; confirmed usage is settled; expired invoked
requests without usage become unknown and retain their holds. Invoke/count timeouts
are 90/10 seconds. There is no automatic paid retry or speculative refund.

For an expired unknown request without confirmed usage, an admin may POST
/api/admin/inference/resolve with a current admin cookie and same-site Origin:
`{"uid":"...","requestId":"...","actual":16,"reason":"AWS usage record verified ..."}`.
Verify provider usage independently and describe the evidence in reason (10–500
characters). Zero is allowed only when verified no charge occurred. Actual cannot
exceed the reservation. The charge ledger records actor, reason and reviewed=true;
concurrent settlement remains idempotent. Do not use this endpoint to guess costs.
Provider usage beyond the configured bound requires a separate operator incident
review; this version cannot debit more than was reserved.

## Validation and limits

Unit tests cover model rejection, duplicate invocation, wallet/global budget
settlement, cancellation, caps, unknown holds, recovery and audited resolution.
Firestore emulator tests exercise competing claims and confirmed-usage recovery
against real transactions. Typecheck, lint and production build run without secrets.
No live Bedrock calls or provider billing were validated in development. Routes
have no deployed browser end-to-end validation yet. Use a small funded test account
and exact-model smoke test before enabling paid calls. Tool calling and the shared
local agent loop are the next phase for the compiler and extension.

AWS references:
- https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_CountTokens.html
- https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_ConverseStream.html


## Vercel API key and cumulative provider budget

Set the replacement long-term key only in Vercel Production as
`AWS_BEARER_TOKEN_BEDROCK`. The server explicitly selects the SDK bearer auth
scheme when a key exists; otherwise the IAM credential chain remains available.
Both token counting and streaming use that configuration with retries disabled.
Never copy the key into the CLI, extension, public variables, or source control.

Keep `BEDROCK_ENABLED=false` until the selected model's credit eligibility,
permissions, token counting and prices are verified. Set
`BEDROCK_CREDIT_EXPIRES_AT` to the credit's UTC expiry timestamp; missing or expired
values block new calls. This date must conservatively reflect the actual expiry.

Set `BEDROCK_TOTAL_USD_CAP=300` (or a smaller positive amount). Values above 300
are rejected. Each model policy now also requires positive integer
`inputNanodollarsPerToken` and `outputNanodollarsPerToken`: multiply the USD price
per million tokens by 1000, rounding upward if necessary. These must cover the
selected model's actual text inference charges independently of wallet pricing.
Do not copy unverified rates from an example. Price snapshots survive subsequent
configuration changes.

The shared `inferenceProviderBudgets/lifetime` document atomically holds maximum
provider costs before invocation, then settles final token costs without resetting
at midnight or after a deployment. Unknown calls retain their holds. Manual wallet
resolution without confirmed provider usage conservatively spends the full dollar
reservation. Never delete or reset this document to bypass the total limit.
Existing requests created before this change are not retroactively priced: before
enabling an already-used gateway, reconcile and seed historical provider spending.
This deployment has made no paid gateway calls yet.

The cap covers calls through this gateway using verified rates, not other clients
using the same AWS account/key, taxes, or additional AWS services. AWS billing is
updated asynchronously; this ledger does not inspect the live promotional balance
or guarantee that AWS applies credits to a particular Marketplace model.
