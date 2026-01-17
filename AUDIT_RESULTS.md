# Digital Doppler Message System - Audit & Hardening Results

## Changes Made

### 1. Environment Variable Security
- ❌ **Fixed**: Removed all fallback values (`|| 'admin'`, `|| 'default-pepper'`)
- ✅ **Added**: Strict environment variable validation in all API routes
- ✅ **Added**: Clear error messages when env vars are missing
- **Files changed**: All API routes, new utility files

### 2. Authentication & Authorization
- ✅ **Created**: `src/utils/auth.ts` - centralized auth helper
- ✅ **Fixed**: Admin inbox now uses static page + fetch (no SSR crashes)
- ✅ **Added**: Constant-time comparison for credentials
- ✅ **Added**: Proper Basic Auth header parsing with error handling

### 3. Database Schema Updates
- ✅ **Updated**: `db/migrations/001_messages.sql` - new schema
- ✅ **Created**: `db/migrations/002_update_schema.sql` - migration script
- ✅ **Changed**: Message types: `public`, `treehole`, `private` (was `public`/`private` only)
- ✅ **Added**: Separate `replies` table for admin responses
- ✅ **Added**: Proper indexes for performance

### 4. API Routes Restructured
- ✅ **Fixed**: `/api/message.ts` - message submission with new types
- ✅ **Created**: `/api/admin/message/list.ts` - admin list messages
- ✅ **Fixed**: `/api/admin/message/update.ts` - admin update with new schema
- ✅ **Fixed**: `/api/message/reply.ts` - key-based reply retrieval

### 5. Crypto & Security
- ✅ **Created**: `src/utils/crypto.ts` - centralized crypto functions
- ✅ **Fixed**: No fallback pepper values
- ✅ **Hardened**: HMAC-SHA256 key hashing (raw keys never stored)

### 6. UI Updates
- ✅ **Updated**: Message form supports all three types (public/treehole/private)
- ✅ **Added**: Email option for private replies (in addition to key-based)
- ✅ **Added**: "Back to Home" buttons on all pages
- ✅ **Fixed**: Dynamic UI based on message type selection

### 7. Admin Interface
- ✅ **Replaced**: SSR admin page with static page + fetch APIs
- ✅ **Added**: Login form with proper error handling
- ✅ **Added**: Filtering by type, status, reply status
- ✅ **Fixed**: Message detail view with proper data binding

## Database Setup

### For New Installations
Run this in your Vercel Postgres console:

```sql
-- Copy contents of db/migrations/001_messages.sql
-- Create messages and replies tables with proper schema
```

### For Existing Installations  
Run this in your Vercel Postgres console:

```sql
-- Copy contents of db/migrations/002_update_schema.sql
-- Migrates existing data to new schema
```

## Required Environment Variables

**Critical - no fallbacks:**
```bash
MESSAGE_KEY_PEPPER=your-very-long-random-string-here
ADMIN_USER=your-admin-username
ADMIN_PASS=your-secure-admin-password
POSTGRES_URL=your-vercel-postgres-connection-string
```

## Build & Deploy Commands

```bash
# Build (should pass without errors)
npm run build

# Deploy to Vercel
git add .
git commit -m "Harden message system: fix env vars, add treehole type, improve security"
git push
```

## Manual Test Checklist

### 1. Message Submission
- [ ] Submit **treehole** message (anonymous, no reply)
- [ ] Submit **public letter** (with name, will be published)
- [ ] Submit **private reply with key** (generates key, shows key page)
- [ ] Submit **private reply with email** (provides email address)

### 2. Key Retrieval  
- [ ] Visit `/message/reply/[message-id]`
- [ ] Enter the key from step 1 (private with key)
- [ ] Should show reply or "No reply yet"

### 3. Admin Functions
- [ ] Visit `/admin/inbox`
- [ ] Login with ADMIN_USER/ADMIN_PASS
- [ ] See list of all messages
- [ ] Filter by type (public/treehole/private)
- [ ] Click a message to view details
- [ ] Write a reply and save
- [ ] Change status (pending→approved)

### 4. Public Letters (Future)
- [ ] Admin approves a public letter
- [ ] Verify it appears on public letters page
- [ ] Verify reply is published with it

### 5. Error Handling
- [ ] Try admin routes without auth → 401
- [ ] Submit invalid message type → 400 with clear error
- [ ] Use invalid key → 404 with clear error

## API Documentation

### POST `/api/message`
Submit a new message
```json
{
  "nickname": "optional name",
  "type": "public|treehole|private", 
  "body": "message content",
  "replyPreference": "none|key|email", // only for private
  "email": "optional@email.com"        // only if replyPreference=email
}
```

### GET `/api/admin/message/list`
List messages (admin only, Basic Auth required)
Query params: `type`, `status`, `wants_reply`, `has_reply`

### POST `/api/admin/message/update`  
Update message status/reply (admin only, Basic Auth required)
```json
{
  "id": "message-uuid",
  "status": "pending|approved|rejected",
  "replyText": "optional reply content"
}
```

### POST `/api/message/reply`
Retrieve reply using key
```json
{
  "id": "message-uuid", 
  "key": "the-reply-key"
}
```

## Security Improvements Made

1. **No Environment Fallbacks** - Server will error clearly if env vars missing
2. **Static Admin Pages** - No SSR that can crash public site  
3. **Proper Auth Validation** - Constant time comparison, proper header parsing
4. **Input Validation** - All API inputs validated with clear error messages
5. **Database Isolation** - Separate tables, proper foreign keys
6. **Crypto Hardening** - No raw key storage, proper HMAC with pepper

## Troubleshooting

### Build Fails
- Check all imports are valid
- Ensure TypeScript types are correct
- Verify all environment variables are set in Vercel

### 500 Errors in Production
- Check Vercel function logs
- Verify environment variables are set
- Check database connection and permissions

### Admin Page Not Loading
- Verify ADMIN_USER/ADMIN_PASS are set
- Check browser network tab for 401/403 responses
- Ensure cookies are enabled

### Key Retrieval Fails
- Verify MESSAGE_KEY_PEPPER is consistent between submission and retrieval
- Check message ID exists and has key_hash set
- Verify user is entering the exact key (case sensitive)

This completes the audit and hardening of the Digital Doppler message system. All critical security issues have been addressed, and the system now supports the full requirements with proper error handling and production reliability.