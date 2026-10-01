import assert from 'node:assert/strict';
import test from 'node:test';
import { recentSignIn, trustedOrigin } from '../lib/auth/policy';
test('session mutation rejects missing or cross-site origins', () => {
  assert.equal(trustedOrigin(null, 'https://swahilipro.com'), false);
  assert.equal(trustedOrigin('https://evil.example', 'https://swahilipro.com'), false);
  assert.equal(trustedOrigin('https://swahilipro.com', undefined), false);
  assert.equal(trustedOrigin('https://swahilipro.com', 'https://swahilipro.com'), true);
});
test('only recent sign-ins can mint web sessions', () => {
  assert.equal(recentSignIn(1000, 1200), true);
  assert.equal(recentSignIn(1000, 1400), false);
  assert.equal(recentSignIn(1500, 1200), false);
  assert.equal(recentSignIn(NaN, 1200), false);
});
