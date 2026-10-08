import { PlatformError } from '@/lib/platform/store';

// Expose only fixed operational codes; SDK messages may contain sensitive data.
export function countingError(error: unknown): PlatformError {
  if (error instanceof PlatformError) return error;
  const name = error && typeof error === 'object' && 'name' in error ? error.name : '';
  switch (name) {
    case 'CredentialsProviderError': return new PlatformError('provider_credentials_missing', 503);
    case 'AccessDeniedException': return new PlatformError('provider_access_denied', 503);
    case 'UnrecognizedClientException':
    case 'InvalidSignatureException':
    case 'ExpiredTokenException': return new PlatformError('provider_authentication_failed', 503);
    case 'ValidationException': return new PlatformError('provider_count_rejected', 503);
    case 'AbortError':
    case 'TimeoutError': return new PlatformError('token_count_timeout', 503);
    default: return new PlatformError('provider_count_unavailable', 503);
  }
}
