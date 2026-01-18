# Digital Doppler

A minimal, elegant portal website built with Astro, featuring a multi-layer visual experience and a complete message/letterbox system.

## ✨ Features

### 🌌 Visual Experience
- **Multi-layer portal**: 5 interactive layers with unique visual themes
  - Layer 1: KAIROS/CHAIRON → KAIRON → AION animated title with lemniscate snake
  - Layer 2: Writings section with Three.js text tunnel
  - Layer 3: Fragments with crystalline sphere visualization
  - Layer 4: Message section with water ripple effects
  - Layer 5: ORPHEUS music portal with 3D tube visualization
- **Smooth transitions**: Layer-based navigation with visual effects
- **Responsive design**: Works on all screen sizes

### 🎵 Music Section
- **ORPHEUS Portal**: Layer 5 features an interactive 3D tube visualization
- **Content Collection**: Music tracks stored as Markdown with frontmatter
- **Track Details**: Each track displays title, release date, streaming links, and lyrics
- **Visual Effects**: Click anywhere to randomize tube colors

### 💌 Message System
Three types of messages:

| Type | Description | Reply Method |
|------|-------------|--------------|
| **Public Letter** | Published on site after approval | Reply visible on site |
| **Treehole** | Private storage, no reply expected | None |
| **Private Letter** | Private message wanting a reply | Key-based retrieval |

### 🔐 Key-Based Reply System
- Users receive a unique cryptographic key after submitting a private letter
- No account needed - just save your key
- Visit `/message/reply/{id}` and enter your key to view the reply
- SHA-256 hashed with server-side pepper for security

### 👤 Admin Interface
- Access via `/admin/inbox` with Basic Auth
- View all messages with filtering (type, status, wants reply)
- Approve/reject messages
- Write and publish replies
- View metadata (timestamps, IP hash, user agent)

## 🚀 Project Structure

```
/
├── public/
│   └── assets/
├── src/
│   ├── content/
│   │   ├── config.ts
│   │   ├── writings/          # Markdown blog posts
│   │   └── music/             # Music tracks with lyrics
│   ├── data/
│   │   └── fragments.json     # Fragments data
│   ├── pages/
│   │   ├── index.astro        # Main portal (5 layers)
│   │   ├── writings.astro     # Writings list
│   │   ├── fragments.astro    # Fragments display
│   │   ├── music.astro        # Music list
│   │   ├── message.astro      # Message submission form
│   │   ├── message/
│   │   │   ├── sent.astro     # Success confirmation
│   │   │   ├── letters.astro  # Public letters list
│   │   │   ├── key/[id].astro # Reply key display
│   │   │   ├── reply/[id].astro # View reply with key
│   │   │   └── letter/[id].astro # Individual letter
│   │   ├── writings/
│   │   │   └── [slug].astro   # Individual writing
│   │   ├── music/
│   │   │   └── [slug].astro   # Individual track
│   │   ├── admin/
│   │   │   └── inbox.astro    # Admin dashboard
│   │   └── api/
│   │       ├── message.ts     # POST: Submit message
│   │       ├── message/
│   │       │   └── reply.ts   # POST: Retrieve reply with key
│   │       └── admin/
│   │           └── message/
│   │               ├── list.ts   # GET: List messages
│   │               └── update.ts # POST: Update message/reply
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       ├── auth.ts            # Admin auth & env validation
│       ├── crypto.ts          # Key generation & hashing
│       └── wordCount.ts       # Word count utility
├── db/
│   └── migrations/
│       ├── 001_messages.sql   # Initial schema
│       └── 002_update_schema.sql # Schema updates
└── package.json
```

## 🧞 Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start dev server at `localhost:4321`         |
| `npm run build`   | Build for production to `./dist/`            |
| `npm run preview` | Preview production build locally             |

## 🔧 Environment Variables

### Required
```bash
POSTGRES_URL="postgres://..."     # Vercel Postgres connection string
MESSAGE_KEY_PEPPER="random-secret" # Secret for hashing reply keys
```

### Admin Access
```bash
ADMIN_USER="your-username"
ADMIN_PASS="your-secure-password"
```

## 📦 Database Setup

1. Create a Vercel Postgres (or Neon) database
2. Run the migration scripts in order:
   ```sql
   -- Run db/migrations/001_messages.sql
   -- Run db/migrations/002_update_schema.sql (if upgrading)
   ```
3. Set `POSTGRES_URL` environment variable in Vercel

### Database Schema

**messages**
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| created_at | TIMESTAMPTZ | Creation time |
| type | TEXT | 'public', 'treehole', or 'private' |
| body | TEXT | Message content |
| nickname | TEXT | Optional display name |
| wants_reply | BOOLEAN | Whether user wants a reply |
| email | TEXT | Optional email (for email notifications) |
| key_hash | TEXT | Hashed reply key |
| status | TEXT | 'pending', 'approved', or 'rejected' |
| admin_notes | TEXT | Internal admin notes |
| ip_hash | TEXT | Hashed IP for rate limiting |
| user_agent | TEXT | Browser user agent |

**replies**
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| message_id | UUID | Foreign key to messages |
| created_at | TIMESTAMPTZ | Creation time |
| reply_body | TEXT | Reply content |
| published | BOOLEAN | Whether reply is visible |
| published_at | TIMESTAMPTZ | When reply was published |

## 🔒 Security Features

- **No raw IP storage**: Only one-way SHA-256 hashes
- **Cryptographic reply keys**: 16-byte random keys, hashed with pepper
- **Rate limiting**: 5 submissions per 10 minutes per IP
- **Constant-time auth**: Prevents timing attacks on admin login
- **Server-side validation**: All inputs validated before processing

## 🚀 Deployment

Deployed on Vercel with:
- **Astro SSR** via `@astrojs/vercel` adapter
- **Vercel Postgres** (or Neon) for database
- **Automatic deployments** from GitHub

## 📝 License

MIT
