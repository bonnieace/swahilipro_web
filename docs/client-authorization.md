# Client authorization and credits (protocol v1)

Built on the Firebase web-account foundation. Native clients use application
credentials issued by Next.js, not Firebase refresh tokens or an OAuth server.
This PR implements the broker and ledger; compiler/extension clients and Bedrock
inference are not implemented by this milestone.

## Login
1. Generate a cryptographically random verifier (43–128 URL-safe characters),
   compute SHA256 base64url without padding.
2. POST JSON to /api/v1/auth/client/start:
   {"clientType":"cli","label":"My terminal","challenge":"<S256 challenge>"}.
   clientType also accepts vscode. Response includes attemptId, pollingSecret,
   confirmationCode, verificationUrl, interval=5 seconds and expiresIn=600 seconds.
3. Display confirmationCode in the client. Open verificationUrl in the browser;
   headless users can open it on another device. Keep pollingSecret/verifier private.
   The browser requires recent Firebase sign-in and explicit Approve/Deny.
4. POST {attemptId,pollingSecret} to /api/v1/auth/client/status at most once per
   interval. State is pending or approved; denied/expired attempts return errors.
5. On approved, wait the interval, then POST {attemptId,pollingSecret,verifier} to
   /api/v1/auth/client/complete. A successful response contains tokenType=Bearer,
   accessToken, refreshToken, expiresIn=900 seconds and grantId. Completion is
   single-use. Lost completion responses require a new login; no secret replay
   cache is persisted. Revocation is available in the website's Devices page.
6. Store the refresh token in the OS keychain or VS Code SecretStorage, never
   command arguments, URLs or logs. Send access token in Authorization: Bearer.

Start requests share beta caps: 20/minute and 100/day. The rate gate is deliberately
conservative and subject to review after measured usage. CORS is not enabled for
untrusted browser origins. GET reads require authenticated web or client sessions.
All browser mutations require exact configured Origin. This application protocol
is not advertised as RFC 8628/OAuth compliance.

## Lifecycle
POST /api/v1/auth/client/refresh with {refreshToken} rotates refresh credentials.
Maximum grant lifetime is 30 days from initial login. Serialize refresh per grant.
A used refresh token revokes the grant family, including current access tokens.
An uncertain refresh response requires re-login; never blindly replay an old token.
POST /api/v1/auth/client/logout with access bearer revokes that grant.
Website /account/devices supports per-device revoke and Sign out everywhere.
The latter increments an application epoch before revoking Firebase refresh tokens,
so existing client credentials fail even if Firebase revocation temporarily fails.
Firebase disable/deletion is checked on every client API request. External Firebase
refresh-token revocation alone does not revoke application grants: perform website
sign-out-everywhere or the same application epoch change for incident response.
Revocation affects new API requests, not commands already executing on a client.

Errors: invalid_request, invalid_attempt, authorization_pending, authorization_denied,
attempt_expired, attempt_consumed, slow_down/rate_limited (429 with Retry-After),
invalid_verifier, authorization_revoked, refresh_reused, service_unavailable.
No endpoint logs credentials or returns Firebase SDK errors.

## Credit units and permissions
GET /api/v1/me works with web cookie or client bearer. GET /api/v1/credits returns
balance/reserved/available as integer microcredits. Microcredits are allowance
units; no currency conversion or model prices have been defined yet. Empty wallet
means zero allowance, not an automatic beta grant.

POST /api/admin/credits/grants requires a web cookie, same-origin request, and
current Firebase custom claim admin=true (set only using trusted Admin SDK tooling).
Body: {uid,amount,operationKey,reason}; amount must be positive safe integer and
operationKey must be 16–128 letters/digits/underscore/hyphen. Duplicate operations
with matching parameters return existing wallet without granting twice; different
parameters return idempotency_conflict. Never set admin claims from browser input.

Internal reserveCredits/settleCredits enforce atomic wallet changes and exactly-once
ledger entries. They are not exposed as arbitrary public wallet mutation endpoints.
The future gateway must calculate conservative cost bounds and reserve before any
paid invocation. Retrying Firestore callbacks cannot execute external work.
Unknown provider outcomes must not be settled as zero merely due to disconnect.

Financial, token and grant collections remain client-denied under Firestore Rules.
Admin SDK bypasses Rules; every route separately authorizes ownership/permissions.

## Cleanup, quotas and tests
Set INTERNAL_JOB_TOKEN to random server-only material of >=32 characters. Schedule
POST /api/internal/cleanup with Bearer secret from Coolify; do not put that secret
in URLs or logged command lines. Each run deletes at most 100 expired documents
per collection. Retain used refresh token hashes until their original expiry for
reuse detection. Choose job frequency to stay within Firestore read/delete quotas;
no paid TTL or Cloud Functions required.

npm test uses a serialized store double to exercise transactional domain invariants,
read-before-write ordering and concurrent contenders. It is not a substitute for
Firestore Emulator/staging validation. Before enabling real users verify Firestore
transactions, denied client writes, Firebase revocation, end-to-end browser consent,
refresh/cancellation, Firestore quotas and logs with an isolated project.
Run real transactional/rules checks with:

npx --yes firebase-tools@13.35.1 emulators:exec --only firestore --project demo-swahilipro 'npm run test:firestore'

CI runs this isolated demo-project suite. Live Firebase credentials have not been
supplied to this workspace. Deploy the creditLedger uid/createdAt composite index
before using credit history. GET /api/v1/usage supports a 50-entry page and an
owner-validated cursor; /account/usage shows the latest 50 entries.
