# Firebase account foundation

This first milestone adds GitHub sign-in, Firebase-backed HttpOnly web sessions,
protected account page, authenticated /api/v1/me and deny-by-default Firestore rules.
Client grants, wallet transactions, LMS synchronization and Bedrock are subsequent
milestones; no credits are minted and no inference is billed by this change.

## Setup
1. Audit any existing Firebase project/users before creating a production project.
2. Register a Firebase web app and copy its public config to the NEXT_PUBLIC values
   in .env.example. These are build-time values: configure them before next build.
3. Enable GitHub under Authentication > Sign-in method. Create a GitHub OAuth app
   and use the exact callback URL Firebase displays. Add the website hostname to
   Firebase authorized domains. Users sign in with GitHub, never paste GitHub tokens.
4. Create Cloud Firestore in the selected region. Deploy firestore.rules and indexes
   using Firebase CLI with an explicit project ID. All client data access is currently denied.
5. Supply FIREBASE_PROJECT_ID plus server-only service-account email/private key,
   or a mounted GOOGLE_APPLICATION_CREDENTIALS file. Keep credentials out of git.
6. Set APP_ORIGIN to the exact public website origin (HTTPS in production). Configure
   Firebase values on Coolify, build, and start the Node app. No Firebase hosting or
   Cloud Functions are required.

Local development: copy .env.example to .env.local; set APP_ORIGIN=http://localhost:3000.
Use a staging Firebase project for popup integration. Never point tests at production.
Production sessions are Secure, HttpOnly, SameSite=Strict and expire after five days.
POST/DELETE session requests require an exact trusted Origin; session creation also
requires a revoked-token check and sign-in within five minutes. Logout clears this
browser session only. Account-wide/device revocation belongs to the client-grant milestone.

## Validation
npm ci; npm test; npm run typecheck; npm run build.
Manual staging checks: successful GitHub login, cancelled popup, protected /account,
unauthenticated /api/v1/me, logout, disabled/revoked user and missing config.
Firebase credentials are required for live checks; builds do not initialize Admin SDK.
CI tests policy decisions without service credentials. Firestore emulator rules tests
will be expanded alongside the first accessible collection.

Use Spark where eligible and monitor Auth/Firestore quotas. This milestone does not
promise every future operation remains free. Do not enable paid products implicitly.
