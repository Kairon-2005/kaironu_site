export function validateAuth(request: Request): { ok: boolean; error?: string } {
  const ADMIN_USER = process.env.ADMIN_USER;
  const ADMIN_PASS = process.env.ADMIN_PASS;
  
  if (!ADMIN_USER || !ADMIN_PASS) {
    return {
      ok: false,
      error: 'Missing required environment variables: ADMIN_USER and/or ADMIN_PASS'
    };
  }

  const auth = request.headers.get('Authorization');
  if (!auth) {
    return { ok: false, error: 'No authorization header' };
  }

  const [scheme, encoded] = auth.split(' ');
  if (scheme !== 'Basic') {
    return { ok: false, error: 'Only Basic auth supported' };
  }

  try {
    const [user, pass] = atob(encoded).split(':');
    if (!constantTimeCompare(user, ADMIN_USER) || !constantTimeCompare(pass, ADMIN_PASS)) {
      return { ok: false, error: 'Invalid credentials' };
    }
    return { ok: true };
  } catch (error) {
    return { ok: false, error: 'Invalid authorization header format' };
  }
}

export function validateEnvVars(required: string[]): void {
  const missing = required.filter(varName => !process.env[varName]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

function constantTimeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  
  return result === 0;
}