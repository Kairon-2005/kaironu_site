import crypto from 'crypto';

function generateReplyKey() {
  return crypto.randomBytes(16).toString("base64url");
}
function hashReplyKey(key) {
  const pepper = process.env.MESSAGE_KEY_PEPPER;
  if (!pepper) {
    throw new Error("Missing required environment variable: MESSAGE_KEY_PEPPER");
  }
  return crypto.createHash("sha256").update(key + pepper).digest("hex");
}
function createIpHash(ip, userAgent) {
  const pepper = process.env.MESSAGE_KEY_PEPPER;
  if (!pepper) {
    throw new Error("Missing required environment variable: MESSAGE_KEY_PEPPER");
  }
  return crypto.createHash("sha256").update(ip + userAgent + pepper).digest("hex");
}

export { createIpHash as c, generateReplyKey as g, hashReplyKey as h };
