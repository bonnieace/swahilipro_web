import assert from 'node:assert/strict';
import test from 'node:test';
import { recentSignIn, resumeSession, signInDestination, trustedOrigin } from '../lib/auth/policy';
test('session mutation rejects missing or cross-site origins', () => {
  assert.equal(trustedOrigin(null, 'https://swahilipro.com'), false);
  assert.equal(trustedOrigin('https://evil.example', 'https://swahilipro.com'), false);
  assert.equal(trustedOrigin('https://swahilipro.com', undefined), false);
  assert.equal(trustedOrigin('https://swahilipro.com', 'https://swahilipro.com'), true);
});
test('sign-in preserves only a valid local client approval destination', () => {
  const destination = `/authorize-client?attempt=${'a'.repeat(43)}`;
  assert.equal(signInDestination(destination), destination);
  for (const next of [null, 'https://evil.example', '//evil.example', `${destination}&next=https://evil.example`, '/authorize-client?attempt=short']) assert.equal(signInDestination(next), '/account');
});
test('resuming a session respects recent approval authentication and explicit reauthentication', () => {
  const destination = `/authorize-client?attempt=${'a'.repeat(43)}`;
  assert.equal(resumeSession('/account', false, false), true);
  assert.equal(resumeSession(destination, true, false), true);
  assert.equal(resumeSession(destination, false, false), false);
  assert.equal(resumeSession(destination, true, true), false);
  assert.equal(resumeSession('/account', true, true), false);
});
test('only recent sign-ins can mint web sessions', () => {
  assert.equal(recentSignIn(1000, 1200), true);
  assert.equal(recentSignIn(1000, 1400), false);
  assert.equal(recentSignIn(1500, 1200), false);
  assert.equal(recentSignIn(NaN, 1200), false);
});
