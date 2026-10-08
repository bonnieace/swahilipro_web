import assert from 'node:assert/strict';
import test from 'node:test';
import { sessionStatusResponse } from '../lib/auth/session-status';

test('a delayed old-session probe cannot overwrite a fresh login or restore logout', async () => {
  for (const newCookie of ['fresh-session', undefined]) {
    let release!: () => void;
    const wait = new Promise<void>((resolve) => { release = resolve; });
    const pending = sessionStatusResponse('old-session', async (token) => {
      assert.equal(token, 'old-session');
      await wait;
      return { auth_time: 1000 };
    }, 1400);
    // A concurrent POST login/DELETE logout completes before the GET probe.
    let browserCookie = newCookie;
    release();
    const response = await pending;
    const cookie = response.headers.get('set-cookie');
    if (cookie) browserCookie = cookie;
    assert.equal(cookie, null);
    assert.equal(browserCookie, newCookie);
    assert.deepEqual(await response.json(), { signedIn: true, recentSignIn: false });
    assert.equal(response.headers.get('cache-control'), 'no-store');
  }
});

test('session probes verify recent, revoked, and absent sessions without writing cookies', async () => {
  const recent = await sessionStatusResponse('fresh-session', async () => ({ auth_time: 1200 }), 1200);
  assert.deepEqual(await recent.json(), { signedIn: true, recentSignIn: true });
  assert.equal(recent.headers.get('set-cookie'), null);
  const revoked = await sessionStatusResponse('revoked', async () => { throw new Error('revoked'); }, 1200);
  assert.deepEqual(await revoked.json(), { signedIn: false, recentSignIn: false });
  assert.equal(revoked.headers.get('set-cookie'), null);
  const absent = await sessionStatusResponse(undefined, async () => { assert.fail('No token to verify'); }, 1200);
  assert.deepEqual(await absent.json(), { signedIn: false, recentSignIn: false });
  assert.equal(absent.headers.get('set-cookie'), null);
});
