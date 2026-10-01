# SwahiliPro accounts, client login, credits, and Bedrock plan

Status: proposed implementation plan; no application behavior changed.
Date: 2026-09-30.
Revision 2026-10-01: Firebase Authentication and Cloud Firestore replace self-hosted Supabase. Next.js remains on the existing Coolify VPS.
Repository inspected: bonnieace/swahilipro_web, master at bcfe2bebb25fd9cd9cff359c6bbc77249cf3ecd4.

## Goal

Use the existing Next.js site as the account portal and server API for SwahiliPro's CLI and VS Code extension. Users sign in through their browser, authorize a client, and consume one shared AI credit allowance. AWS credentials stay on the server. Repository access, file edits, commands, and user approvals run locally in the clients.

## Verified current state

- package.json declares Next.js ^14.2.20, React ^18.2.0, TypeScript, Tailwind, NextUI, and Node 22.x. Scripts include next build and next start.
- next.config.js is empty; the repository is not configured as a static export.
- app/lms/page.jsx is a client component containing lessons, completion, points, and badges. Progress is saved under localStorage key swahiliLMSProgressV2. Completion is self-reported.
- package.json lists Clerk, NextAuth, Firebase, and Firebase Admin. These dependencies do not establish a working account system: the inspected tree has no auth handlers, middleware, database schema, migrations, or API route handlers; app/layout.tsx and app/providers.tsx do not initialize authentication.
- components/navbar.tsx offers documentation, learning, examples, blog, releases, and installation, but no sign-in/account controls.
- app/layout.tsx uses https://swahilipro.com for canonical metadata. Keep the public domain unless deployment requirements say otherwise; configure the API/auth origin explicitly.
- No lockfile, Dockerfile, automated test suite, or CI workflow appears in the inspected tree. README.md still describes the original template.
- No AGENTS.md is present in this tree.
- The deployed environment, AWS account, external auth projects, and production data have not been inspected. Before removing unused auth dependencies, check whether another deployed branch or external service contains existing users.

## Architecture and proposed choices

Use managed Firebase Authentication for website accounts and Cloud Firestore for application data. Keep the Next.js Node server on Coolify for account pages, client authorization, Bedrock streaming, and credit enforcement. No Supabase stack, PostgreSQL server, SQL migration system, or separate auth server is required.

The repository already declares firebase and firebase-admin. Audit any real deployed Firebase project/users first; reuse identities where appropriate. Configure one production Firebase project and an isolated staging project or Emulator Suite. Start with GitHub or Google login and optional verified email/password; avoid phone/SMS and additional paid Firebase services for the initial beta.

Use Firebase browser SDK for web login and Firebase Admin SDK only on the server. Exchange a recently issued verified Firebase ID token for an HttpOnly Secure SameSite web session cookie with CSRF protection. Verify session revocation/disabled-user state for sensitive operations. Browser sign-in is not a CLI OAuth authorization server.

Keep the landing page/docs/guest lessons public. Authenticated learning progress follows the Firebase UID. Learning points cannot mint AI credits.

### Native clients: application authorization broker

Use one explicit Next.js client-authorization flow for both CLI and extension. This is an application protocol, not a claim that Firebase implements RFC 8628 or OAuth authorization-server endpoints. Define and security-test the protocol before rollout; use maintained cryptographic/session primitives.

1. Client generates a cryptographically random verifier and sends its S256 challenge, public client type and label to POST /api/v1/auth/client/start. Server creates a short-lived login attempt and returns a high-entropy polling secret, attempt ID, verification URL, and polling interval. Store only hashes of bearer secrets.
2. swa login or extension Sign in opens the website with the attempt reference; headless users can open the URL on another device. No passwords or access/refresh tokens appear in URLs.
3. Website signs in using Firebase and displays exact client type, label, requested permissions and a matching confirmation phrase/code. User explicitly approves or denies with CSRF protection and recent sign-in. Never automatically approve from an existing web session.
4. The client polls a bounded endpoint with the polling secret. Completion requires the original verifier matching the challenge and atomically consumes the approved attempt once.
5. Server issues SwahiliPro client credentials: short-lived opaque access tokens and rotating opaque refresh tokens bound to a server-owned grant and Firebase UID. This protocol does not distribute Firebase refresh credentials to native clients.
6. Tokens are stored hashed in Firestore, excluded from logs; validate grant revocation, account status and expiry for every paid request. Refresh reuse revokes the credential family. Serialize concurrent client refresh and specify safe recovery for a lost refresh response; do not create ad-hoc replay windows.
7. Portal lists and revokes grants per device. Account disable/delete and sign out everywhere invalidate grants. Firebase's account-wide refresh revocation alone does not revoke these application grants: implement and test coordinated revocation/account epoch checks.

Use random secrets of at least 256 bits, short attempt expiry, constant-time comparisons, strict request limits, deny/expire states, and bounded polling/backoff. Neither possession of an attempt URL nor knowledge of a human confirmation code authorizes token retrieval. No callback URI allowlists or Firebase OAuth-server compatibility gates are needed for this initial flow. Standard native OAuth can be reconsidered later if a maintained provider is introduced.

Store CLI refresh tokens in OS credential storage and extension refresh tokens in VS Code SecretStorage. Public clients contain no client secret. Repository settings cannot change trusted auth/API destinations.

### Firestore access and data management

Keep collection schemas, indexes, Security Rules, emulator configuration, generated/validated types, and versioned data-upgrade scripts in the repository. Use additive document schema versions rather than SQL migrations.

Browser reads of own profile/progress may use Firestore under strict Security Rules. Validate lesson IDs/course versions and prevent edits to admin flags, credits, ledger, grants, and inference records. For the beta, keep balances/usage behind Next.js API to simplify authorization and consistent freshness.

Financial/session collections deny direct client access. Firebase Admin bypasses Security Rules: enforce UID, roles, grant ownership, and permissions in every privileged handler, with least-privilege IAM credentials kept server-only. Never accept authoritative UID, prices, balances, or usage from clients.

## User login and session lifecycle

Website accounts are Firebase identities. Native credentials belong to individual SwahiliPro grants referencing those identities; they are not Firebase ID tokens and must not be fed into Firebase token verification APIs. Document accepted credential type per endpoint.

Browser web session creation requires a verified recent ID token, CSRF controls, and suitable expiry. Native refresh/logout/revocation follow the grant protocol above. Privileged role changes and account disable/delete immediately block paid work through server-owned state. Polling attempts and revoked/expired token records need scheduled cleanup; do not rely on paid TTL deletion being available on the chosen Firebase plan.

## Database records

| Collection / system | Purpose |
| --- | --- |
| Firebase Auth | Website identities/providers/password recovery; managed by Firebase |
| profiles / lessonProgress | Firebase UID, course version and validated progress; learning points derived from lesson definitions |
| loginAttempts | Challenge, hashed polling secret, confirmation phrase, expiry, approval/denial and consumed state |
| clientGrants / clientTokens | Device label, Firebase UID, permissions, revocation epoch, hashed access/refresh credentials and rotation family |
| creditAccounts | Integer posted balance/reserved amount; available = balance - reserved must remain nonnegative |
| creditLedger | Append-only grant/charge/refund/adjustment records with deterministic operation IDs and actor/reason |
| inferenceRequests | Per-user idempotency key, request hash, reservation, pricing snapshot, provider ID, usage, lifecycle and lease |
| modelPolicies / auditEvents | Model allowlist/pricing and redacted administrative/security history |

Use integer microcredits within validated JavaScript safe-integer bounds, documented conversion/rounding, and separate provider currency/cost. Financial mutations run in Admin SDK Firestore transactions. Reserve wallet balance, create request and ledger records atomically; settle/refund using deterministic document IDs and request state to prevent duplicate charges.

Firestore transactions can retry: never invoke Bedrock, send email, issue external actions, or emit a successful stream inside a transaction callback. Commit the reservation first, then invoke the provider once under a durable lease. Keep unknown provider outcomes tracked instead of automatically retrying or releasing holds. Transaction retries and provider retries are different operations.

Avoid a single global hot document at scale; for initial small beta a global budget reservation can be transactional, with contention monitored. Paginate usage, use indexed queries, bound document size, and avoid writing streaming deltas or prompts into Firestore.

## API and interface contract

Firebase hosts website provider sign-in; Next.js exposes /api/v1/auth/client/start, status/complete, refresh, and logout for the application client-grant protocol. Publish exact request/response schemas, timeout/rotation semantics and error codes before client implementation.

| Route | Purpose |
| --- | --- |
| GET /api/v1/me | Authenticated identity and permissions |
| GET /api/v1/credits | Posted balance, reservations, available balance |
| GET /api/v1/usage | Paginated usage scoped to the current user |
| GET /api/v1/models | Allowed models with capabilities and limits |
| POST /api/v1/inference | Validate, reserve, stream one model call, settle usage |
| GET /api/v1/requests/:id | Recover request status after a dropped connection |
| GET /api/v1/devices | List the user's authorized clients |
| DELETE /api/v1/devices/:id | Revoke that user's client session |
| Firestore SDK for lessonProgress | Account-backed progress under tested Security Rules; Next.js validates operations needing server logic |
| POST /api/admin/credits/grants | Authorized, audited, idempotent beta credit grant |

Browser pages: /sign-in, /sign-up if needed, /authorize-client, /account, /account/usage, /account/devices, and /admin/credits. All native client authorization is explicit on /authorize-client; no Supabase OAuth endpoints are used.

Define an OpenAPI contract plus stream event fixtures before updating clients. Stream events should include request.started, text.delta, tool_call.delta, usage, request.completed, and request.failed, carrying a request ID and event version. Specify complete tool-call assembly, cancellation, maximum body sizes, context limits, and error codes such as insufficient_credits, rate_limited, model_unavailable, and reauthentication_required.

The client agent loop sends each model turn through this API and executes approved tools locally. Tool definitions and results are data, never executable instructions for the VPS. The server must not run customer shell commands.

## Bedrock gateway and spending controls

- Use server-only AWS credentials with the minimum model invocation permissions; never use NEXT_PUBLIC variables for secrets.
- Maintain an explicit model/region/API allowlist. Validate actual account access, streaming, tool use, context limits, usage reporting, and pricing for each enabled model.
- Do not assume Grok and Kimi use the same Bedrock API or are enabled in the chosen region. Implement an adapter per supported endpoint/API, normalized behind the client contract.
- Before provider invocation, atomically reserve a conservative maximum cost for the validated input and bounded output, including applicable reasoning/cache charges. Reject models for which a safe bound cannot be enforced.
- Use a per-user idempotency key plus request hash. A duplicate must return the original status/result where retained, never issue another paid request. Reject reuse with a different payload.
- Settle once from trustworthy provider usage and release the excess reservation. Every model turn is metered; impose per-request, per-user, concurrency, and global daily limits.
- On cancellation, stop provider work where supported and settle any consumed usage. A disconnected browser does not prove zero cost.
- Model the durable lifecycle: reserved -> invoking -> completed/failed/cancelled, with an unknown/reconciling state for ambiguous failures.
- Reconcile orphaned requests after restarts. Never blindly release a hold or retry an invocation whose provider outcome is unknown. Use leases and bounded reconciliation deadlines with a documented administrative resolution path.
- Keep raw prompts, source files, and tool results out of application logs by default. Retain metadata needed for billing and troubleshooting, with a documented retention period.
- AWS promotional credits and user credit balances remain independent. Confirm credit eligibility and expiry in AWS; implement an application kill switch rather than relying on billing alerts to stop spending.

## Implementation order and acceptance criteria

### PR 1 — Runtime and Firebase foundation
Upgrade to a supported patched Next.js release, align dependencies, add lockfile, non-mutating lint, typecheck, CI, container build/healthcheck and environment guide. Initialize Firebase project config, Firestore rules/indexes and Emulator Suite. Audit existing users before removing Clerk/NextAuth or unused provider dependencies.
Accept: build and existing public pages work; emulator rules tests pass; deployment needs no local database/auth stack.

### PR 2 — Web accounts and client authorization
Firebase sign-in, secure web cookies, account pages, and Next.js login attempt/grant/refresh/revocation protocol.
Accept: wrong verifier, stolen URL, denied/expired attempt, duplicate completion, refresh races/reuse, disabled account, grant revoke, account-wide revoke and cross-user operations are covered. No secrets in URLs/logs.

### PR 3 — Credit transactions and beta grants
Firestore wallet/ledger/request transactions, indexed usage, pricing snapshots, admin grants.
Accept: simultaneous CLI/extension requests cannot overspend; retrying a transaction never invokes Bedrock; deterministic settlements/grants are idempotent; browser/client cannot mutate financial records.

### PR 4 — Bedrock and reconciliation
One verified model, normalized streaming, durable reservations/leases, cancellation, status recovery, kill switch and scheduled Coolify reconciliation.
Accept: disconnects/restarts do not duplicate paid invocations or charges; unknown outcomes remain recoverable; real smoke tests use small explicit budgets.

### PR 5 — CLI then extension
Connect clients to the shared Next.js authorization protocol and existing gateway contract; keep local agent architecture from companion plans.
Accept: one Firebase user authorizes separate CLI/extension grants; shared credits, revocation, streaming and approvals work end-to-end.

### PR 6 — LMS sync and beta
Validate/import browser progress once per course version; keep guest learning. Small cohort beta with quota and cost monitoring, deletion controls and tested recovery.
Accept: progress does not mint AI credits; no corruption during hydration; quota failures block new paid work safely.

## Free-tier operating plan

Target Firebase Spark/no-cost allowances for Auth and Firestore initially; choose standard sign-in providers and do not require Cloud Functions, Cloud Run, Firebase Storage, paid exports/backups, or automatic TTL cleanup. Next.js and scheduled jobs stay on the already available VPS. AWS inference remains separately billed against eligible credits.

Firestore currently documents free allowances of 1 GiB stored data, 50,000 reads/day, 20,000 writes/day, 20,000 deletes/day and 10 GiB outbound/month for one eligible database. Verify current project/product eligibility and Auth limits during setup; these are not a guarantee that all workloads fit free usage.

Estimate reads/writes per login, refresh, paid model turn, reservation/settlement, reconciliation and dashboard view. Paginate history, cap polling, avoid broad realtime listeners, fetch balance on relevant events rather than every streamed chunk, and never persist stream tokens. Do not cache revocation state beyond the stated security SLA just to save reads.

Quota exhaustion must fail closed: no successful reservation means no Bedrock invocation. Already-invoked requests that cannot settle stay tracked and reconcile when service recovers. Alert on quota trends; Spark can reject requests at limits. Moving to Blaze requires an explicit cost decision; budget alerts are not hard spending caps.

## Coolify operations and recovery

Only the Next.js application and its scheduled jobs run on Coolify; Firebase is managed externally. Select Firestore location considering VPS latency and data requirements. Use Firebase Emulator Suite for deterministic CI and an isolated staging project for integration.

Server-only Firebase Admin credentials/IAM and AWS credentials are stored as Coolify secrets, never NEXT_PUBLIC values. Public Firebase browser config is not an admin credential; Security Rules and server authorization enforce data access. Configure Firebase authorized domains and provider callbacks for the real website origin.

Deploy rules/indexes and data upgrade scripts in controlled releases. Test proxy streaming, cancellation and health checks. Schedule reconciliation and expired-record cleanup on the VPS, not through mandatory Cloud Functions/paid TTL.

Define recovery for application records and Auth users. Keep versioned rules/config and secrets recovery procedures; maintain a tested scheduled application-level export/restore approach within quotas if available, or explicitly choose paid managed export/backup later. Do not assume Spark includes managed backups/PITR. Protect encrypted recovery copies off the VPS, never export raw active bearer tokens, and revoke grants on security recovery. Keep Bedrock kill switch available independently of normal UI.

## Decisions to confirm during implementation

- Is master the deployed branch, and do any external auth projects contain existing users?
- Which public origin will host the account/API endpoints?
- Which AWS region and exact models are enabled, and what credit programme/expiry applies?
- What beta allowance, model limits, conversion rate, and account eligibility should apply?
- Is paid checkout required for launch? Default plan: beta grants first; add payments with verified, idempotent webhooks later.
- Which existing Firebase project/users should be reused, and which Firestore region and standard sign-in provider should we choose?
- What measured request volume fits the no-cost quotas, and what retention/recovery policy applies?
- What client-grant lifetimes, refresh-loss recovery and account revocation SLA should apply?

## References checked

- https://nextjs.org/support-policy
- https://firebase.google.com/docs/auth/admin/manage-cookies
- https://firebase.google.com/docs/auth/admin/manage-sessions
- https://firebase.google.com/docs/firestore/manage-data/transactions
- https://firebase.google.com/docs/firestore/security/rules-conditions
- https://firebase.google.com/docs/firestore/quotas
- https://firebase.google.com/docs/firestore/pricing
- https://firebase.google.com/docs/emulator-suite
- https://docs.aws.amazon.com/bedrock/latest/userguide/models-api-compatibility.html

This is a source inspection and design plan, not a production audit or a claim that any deployment, account, model, or billing integration has been tested.
