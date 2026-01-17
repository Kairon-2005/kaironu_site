# Digital Doppler

A minimal portal website built with Astro, featuring a message/letterbox system.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   ├── pages/
│   │   ├── index.astro          # Main portal
│   │   ├── message.astro        # Message submission form
│   │   ├── letters.astro        # Public letters list
│   │   ├── letters/[id].astro   # Individual letter view
│   │   ├── message/
│   │   │   ├── sent.astro       # Success confirmation
│   │   │   ├── key/[id].astro   # Reply key display
│   │   │   └── reply/[id].astro # Reply viewing
│   │   ├── admin/
│   │   │   └── inbox.astro      # Admin interface
│   │   └── api/
│   │       ├── message.ts       # Message submission
│   │       ├── message/reply.ts # Reply retrieval
│   │       └── admin/message/update.ts # Admin updates
│   └── styles/
│       └── global.css
├── db/migrations/
│   └── 001_messages.sql         # Database schema
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🔧 Environment Variables

For deployment, set the following environment variables:

### Required
- `POSTGRES_URL` - Vercel Postgres connection string
- `MESSAGE_KEY_PEPPER` - Secret string for hashing reply keys (generate a random string)

### Admin Access
- `ADMIN_USER` - Admin username (default: 'admin')
- `ADMIN_PASS` - Admin password (default: 'admin')

### Example .env
```bash
POSTGRES_URL="postgres://username:password@host:port/database"
MESSAGE_KEY_PEPPER="your-random-secret-pepper-string-here"
ADMIN_USER="admin"
ADMIN_PASS="your-secure-admin-password"
```

## 📦 Database Setup

1. Set up a Vercel Postgres database
2. Run the migration script in `db/migrations/001_messages.sql`
3. Set the `POSTGRES_URL` environment variable

## 🎯 Features

### Message System
- **Public letters**: Can be approved by admin and displayed publicly with optional replies
- **Private messages**: Either "treehole" (no reply) or key-based reply system
- **Anonymous or named**: Users can choose to be anonymous or provide a display name
- **Reply keys**: Secure viewing of replies using cryptographic keys (no accounts needed)

### Admin Interface
- **Basic Auth protected**: Access via `/admin/inbox`
- **Message management**: Approve/reject messages, write replies
- **Filtering**: By mode, status, reply preference, and reply status
- **Rate limiting**: Built-in spam protection (5 submissions per 10 minutes per IP)

### Security
- **No raw IP storage**: Only one-way hashes for rate limiting
- **Cryptographic reply keys**: SHA-256 hashed with server-side pepper
- **Basic Auth**: Constant-time comparison for admin credentials
- **Input validation**: Server-side validation for all user inputs

## 👀 Want to learn more?

Feel free to check [Astro documentation](https://docs.astro.build).
