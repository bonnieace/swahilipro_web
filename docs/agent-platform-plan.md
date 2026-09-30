# SwahiliPro accounts, client login, credits, and Bedrock plan

Status: proposed implementation plan; no application behavior changed.
Date: 2026-09-30.
Revision: self-hosted Supabase on the existing Coolify server replaces the proposed Better Auth and separate PostgreSQL setup.
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

Deploy the Next.js Node application and a pinned self-hosted Supabase Docker Compose stack as separate services on the existing Coolify VPS. Supabase supplies Auth and PostgreSQL; Next.js supplies the account/consent UI, product rules, and Bedrock streaming gateway. Use Supabase's PostgreSQL instance rather than creating another database server for the application.

Use Supabase Auth as the single identity source across web, LMS, CLI, and extension. Start with GitHub sign-in; enable email/password, verification, and recovery with configured production SMTP. Preserve any real existing identities discovered during deployment inventory. Remove unused Clerk, NextAuth, and Firebase dependencies after that inventory; do not introduce Better Auth alongside Supabase.

Use supabase-js and the Next.js SSR integration for supported account/data operations. Keep application SQL migrations and database functions in supabase/migrations as the single schema source of truth. Avoid adding Drizzle and a second migration system without a concrete need. Use generated database types and generated data APIs for simple authorized reads and progress updates. Start with database-backed rate limits; introduce Redis only when measured traffic warrants it.

Begin with Auth, PostgreSQL, the required API/gateway dependencies, and secured Studio administration. Omit optional Realtime, Storage, image processing, Edge Runtime, and analytics services where the pinned Compose stack permits it. Add them only when needed. Keep the Bedrock gateway in Next.js rather than duplicating it in Edge Functions.

### Access boundaries and reduced boilerplate

- Supabase owns identities, credential recovery, and supported token lifecycle operations. Application profiles reference auth.users by stable user ID; do not maintain a second password or identity table.
- Use row-level security on every application table exposed through the data API. Users may read their own balances, usage, and progress; they cannot mutate balances, ledger entries, reservations, model policies, or admin roles.
- Safe browser reads and validated LMS progress updates can use Supabase directly under RLS. Financial mutations must pass through Next.js authorization and restricted transactional database functions.
- Implement reserve, settle, refund, and grant operations as atomic SQL functions with row locking and idempotency constraints. Revoke public/anon/authenticated execute permissions for privileged functions, restrict server credentials, and set a fixed search_path on SECURITY DEFINER functions.
- Keep Supabase secret/service-role keys and AWS credentials server-only. A service-role key bypasses RLS: every privileged handler must independently authenticate the user and authorize the action; prefer narrowly granted database roles for financial operations where practical.
- Keep financial internals in a non-exposed schema where practical. Test access through both direct data APIs and Next.js so an alternate route cannot bypass spending controls.
- Keep scheduled reconciliation in this codebase, invoked by a Coolify scheduled job; no separate backend application is required.

### Native-client authentication compatibility gate

Supabase documents an OAuth authorization-server flow with PKCE. Before committing to a rollout, test the exact self-hosted Auth image and configuration for enabling that server, registering public clients, consent, callback restrictions, refresh rotation, claims/scopes, and revocation. Social login into the website alone does not prove native-client authorization-server support.

Device authorization is not assumed available. Check the pinned release explicitly. Ship browser-based desktop login first if device flow is unavailable; defer headless/SSH login rather than inventing a custom token relay. If required native-client capabilities fail the spike, record the gap and revise the authentication design before implementing either client.

Keep the landing page, documentation, and guest lessons public. Add protected account pages. Separate learning points from AI credits; local lesson completion must never mint paid inference allowance.

## User login and session lifecycle

1. The installed CLI offers swa login; the extension offers Sign in to SwahiliPro when first opened. Do not launch a browser merely because installation occurred.
2. A desktop client opens the system browser for authorization-code login with PKCE S256 and state. Use a loopback callback for the CLI and a registered VS Code callback for the extension.
3. The website signs in or registers the user and displays explicit client consent.
4. The authorization code is short-lived, single-use, and bound to the client, callback, and PKCE challenge.
5. The client receives short-lived access credentials and rotating refresh credentials. Public clients contain no client secret.
6. If supported by the pinned self-hosted release, headless/SSH clients use a device code and verification URL, with expiration, polling intervals, rate limiting, and approve/deny behavior. Otherwise defer this capability explicitly.
7. The portal lists connected devices and supports per-device revocation and sign out everywhere.

Use Supabase's supported protocol handlers. Confirm callback support, refresh rotation/reuse detection, and revocation behavior in the spike; do not hand-roll cryptographic protocols to fill gaps. Validate token signature, issuer, audience, expiry, and supported client/scope claims on gateway requests. Proposed product permissions are profile:read, credits:read, and inference:invoke; map them to verified Supabase capabilities or enforce them in a server-owned grant record. Web admin privileges cannot be acquired through client scopes.

Do not equate revoking refresh credentials with immediately invalidating an already-issued JWT. Establish and test a bounded revocation policy. If immediate blocking of inference is required, check a server-owned client grant/session denylist on every paid request, tied to a verified token identifier. Device listing and individual revocation remain acceptance gates until confirmed in the pinned release.

Store extension secrets in VS Code SecretStorage and CLI credentials in the OS credential store. Where no secure store exists, document and explicitly opt into a restricted-permission fallback. Never log tokens or embed them in callback query strings.

## Database records

| Record | Purpose and invariants |
| --- | --- |
| Supabase-managed auth schema | Users, identities, sessions, and supported OAuth records; managed by Supabase, not application migrations |
| Profile / ClientGrant | Application profile and server-owned product permissions or revocation metadata where needed; reference verified Supabase user/client identifiers |
| CreditAccount | One account per user; integer balance and reserved amount; transactionally enforce available = balance - reserved >= 0 |
| CreditLedgerEntry | Append-only grants, charges, refunds, and adjustments; unique operation keys; admin actor/reason for adjustments |
| InferenceRequest | User/client, idempotency key, request hash, model, pricing snapshot, reservation, provider ID, usage, status, timestamps |
| ModelPolicy | Enabled model IDs, endpoint/API/region, context/output limits, supported tools, pricing version, permissions |
| LessonProgress | User + course version + lesson unique key; completion timestamp; points computed server-side from course content |
| AuditEvent | Consent, revocation, administrative grants, model changes, and reconciliation actions; redact secrets and source content |

Store amounts in integer microcredits, define a documented conversion and rounding rule, and keep provider currency/cost separate. Do not store floating-point wallet balances. Never accept authoritative prices, balances, user IDs, or token counts from a client.

## API and interface contract

Auth endpoints are provided by the self-hosted Supabase Auth service, normally under /auth/v1 on its configured public origin. Publish the actual discovery, authorization, token, and supported revocation/device endpoints after the compatibility spike. Do not assume the old /api/auth layout. Next.js remains the API origin for product operations.

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
| Supabase data API for LessonProgress | Account-backed progress synchronization under tested RLS; add a Next.js wrapper only if validation cannot be enforced cleanly in PostgreSQL |
| POST /api/admin/credits/grants | Authorized, audited, idempotent beta credit grant |

Browser pages: /sign-in, /sign-up if needed, /authorize, /account, /account/usage, /account/devices, and /admin/credits. Add /device only if device authorization passes the compatibility gate. Document the final mapping between Next.js consent pages and Supabase Auth endpoints.

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

### PR 1 — Runtime and deployment foundation
Upgrade Next.js to a currently supported patched release and align React, TypeScript, UI dependencies, and ESLint. Add a lockfile, non-mutating lint command, typecheck, tests, CI, container/standalone build, health check, environment example, Supabase SQL migrations, and deployment instructions. Add a pinned minimal Supabase Compose configuration compatible with Coolify, generated secrets, secured Studio access, and persistent volumes.
Accept: build passes; landing/docs/LMS retain behavior; production container starts; database backup and restore are demonstrated in staging. Keep upgrades reviewable independently of auth changes.

### PR 2 — Web accounts and authorization server
Run the self-hosted Supabase OAuth compatibility spike, add Supabase SSR integration, sign-in and consent/account pages, establish profiles and roles, and implement PKCE and verified session-management capabilities. Remove unused auth dependencies only after confirming no deployed integration relies on them.
Accept: login/logout, expired/replayed codes, wrong PKCE/callback, refresh reuse, revocation (including already-issued access tokens), and cross-user access tests pass. Test direct Supabase data access under RLS. Denied/expired device-flow tests are required only if that feature is supported and included; otherwise document it as deferred.

### PR 3 — Credit ledger and administrative grants
Add credit records, restricted transactional SQL functions for reservations/settlements/grants, RLS policies, pricing snapshots, usage views, and audited beta grants. Start with admin-assigned credits; paid checkout is a separate milestone.
Accept: simultaneous CLI/extension requests cannot overspend; grants and settlements are idempotent; balances reconcile to ledger entries; ordinary users cannot grant credits or invoke privileged functions through Supabase's data/RPC APIs.

### PR 4 — Bedrock inference and reconciliation
Add one verified model first, server credential handling, model policies, normalized streaming, limits, cancellation, request recovery, and scheduled reconciliation.
Accept: text and tool calls stream correctly; provider failures and application restarts do not double-charge; ambiguous provider outcomes remain tracked; global kill switch blocks new paid work. Use explicit small budgets for real-provider smoke tests.

### PR 5 — Connect CLI, then extension
Implement against the published API in bonnieace/swahilipro-compiler first: swa login/logout/whoami, credits, then chat. Connect bonnieace/swahilipro_extension using the same contract, with a dedicated sidebar and secure token storage. Inspect those codebases before choosing how to package the shared agent engine.
Accept: one account authorizes both clients; credit updates are consistent; revocation works; stream reconnects do not rerun paid calls; edits/commands require appropriate local approval. Existing language/runtime features remain usable.

### PR 6 — LMS sync and beta rollout
Move lesson data out of the page for reuse, add Supabase-backed progress with RLS and server-defined lesson validation, and optionally import browser progress once per course version with validation and deduplication. Treat imported progress as educational state, not trusted evidence for awarding AI credits.
Accept: guest learning remains usable; invalid local JSON does not crash the page; progress is not overwritten before hydration; signed-in progress follows the user across devices.
Roll out to a small allowlisted cohort, monitor latency/errors/spend, verify backups, and enable additional models only after capability and cost tests.

## Coolify operations

Use isolated staging and production Supabase stacks and credentials. Pin and record all service image versions, including Auth; verify Coolify's template versions rather than assuming managed-Supabase feature parity. Configure public HTTPS origins for the site and Supabase (for example a dedicated subdomain under uzanet.co.ke), exact callback allowlists, internal service URLs, and private database connectivity. Restrict Studio to administrators.

Measure free RAM, CPU, disk, and existing workloads before rollout. The Supabase full-stack guide lists 4 GB RAM/2 cores/40 GB SSD minimum and 8 GB+/4 cores+/80 GB+ SSD recommended; these are not guarantees of spare capacity for Next.js and the other VPS apps. Omit optional services and load-test the combined deployment. The shared VPS is a common failure domain: keep encrypted off-server database backups, required configuration/secrets, and any later Storage objects, and rehearse restoring the entire stack.

Configure production SMTP for verification/recovery messages, and test delivery. Self-hosting leaves upgrades, monitoring, security patching, backup scheduling, and restores with us. Run migrations as a controlled release step, not concurrently from every server instance. Configure proxy streaming without response buffering, appropriate idle timeouts, cancellation handling, and health checks. Test an actual multi-minute stream through the production proxy. Schedule reconciliation independently of web requests and persist all financial state in PostgreSQL.

Document deployment origin, OAuth callback URLs, Supabase public/internal URLs, publishable key, server-only secret/service-role credentials, restricted database connection settings, Supabase signing/auth secrets, GitHub OAuth credentials, SMTP settings, AWS region/credentials, enabled model configuration, global spending cap, and internal job authentication. Confirm VPS memory/CPU headroom before setting inference concurrency. No GPU is needed on the VPS.

Roll back the app independently of additive schema migrations. Disable new inference using the kill switch during billing incidents while preserving account access and reconciliation.

## Decisions to confirm during implementation

- Is master the deployed branch, and do any external auth projects contain existing users?
- Which public origin will host the account/API endpoints?
- Which AWS region and exact models are enabled, and what credit programme/expiry applies?
- What beta allowance, model limits, conversion rate, and account eligibility should apply?
- Is paid checkout required for launch? Default plan: beta grants first; add payments with verified, idempotent webhooks later.
- Which pinned self-hosted Supabase/Auth version passes the native-client authorization, claims, refresh, and revocation tests? Is device flow available or deferred?
- What resources remain on the shared VPS, and where will off-server backups be stored?

## References checked

- https://nextjs.org/support-policy — Next.js 14 is listed as unsupported.
- https://nextjs.org/docs/app/guides/backend-for-frontend — Route Handlers and server APIs.
- https://supabase.com/docs/guides/self-hosting/docker — self-hosted services, resource guidance, and configuration.
- https://supabase.com/docs/guides/auth/oauth-server — OAuth authorization-server capability; verify the pinned self-hosted release.
- https://supabase.com/docs/guides/auth/oauth-server/oauth-flows — PKCE authorization flow.
- https://supabase.com/docs/guides/auth/server-side/advanced-guide — SSR integration and session handling.
- https://www.rfc-editor.org/rfc/rfc8252 — native app browser authorization.
- https://www.rfc-editor.org/rfc/rfc8628 — device authorization protocol.
- https://docs.aws.amazon.com/bedrock/latest/userguide/models-api-compatibility.html — model/API compatibility.

This is a source inspection and design plan, not a production audit or a claim that any deployment, account, model, or billing integration has been tested.
