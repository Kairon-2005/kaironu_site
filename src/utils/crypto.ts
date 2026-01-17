import crypto from 'crypto';

export function generateReplyKey(): string {
  return crypto.randomBytes(16).toString('base64url');
}

export function hashReplyKey(key: string): string {
  const pepper = process.env.MESSAGE_KEY_PEPPER;
  if (!pepper) {
    throw new Error('Missing required environment variable: MESSAGE_KEY_PEPPER');
  }
  return crypto.createHash('sha256').update(key + pepper).digest('hex');
}

export function createIpHash(ip: string, userAgent: string): string {
  const pepper = process.env.MESSAGE_KEY_PEPPER;
  if (!pepper) {
    throw new Error('Missing required environment variable: MESSAGE_KEY_PEPPER');
  }
  return crypto.createHash('sha256').update(ip + userAgent + pepper).digest('hex');
}