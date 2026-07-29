# The Girl Can Foundation

Production-grade nonprofit website built with Next.js 15, Prisma, PostgreSQL, Auth.js, Paystack, Stripe, Resend, and Cloudinary.

## Quick start

### Prerequisites

- Node.js 20+
- Docker Desktop (for local Postgres)
- npm 10+

### 1. Install & configure

```bash
npm install
cp .env.example .env
```

Generate a strong `NEXTAUTH_SECRET` (and matching `AUTH_SECRET`) in `.env`.

### 2. Start the database

```bash
docker compose up -d
npx prisma db push
npm run db:seed
```

### 3. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Admin:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

| Email | Password |
|-------|----------|
| `admin@girlcanfoundation.org` | `ChangeMe123!` (or `ADMIN_PASSWORD` from `.env`) |

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Next.js dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run db:push` | Sync Prisma schema to DB |
| `npm run db:migrate` | Create/apply migrations |
| `npm run db:seed` | Seed prototype copy + sample data |
| `npm run db:generate` | Regenerate Prisma Client |

## Environment variables

See [`.env.example`](.env.example) for the full list:

- `DATABASE_URL` — Postgres connection string
- `NEXTAUTH_SECRET` / `AUTH_SECRET` / `NEXTAUTH_URL`
- `PAYSTACK_SECRET_KEY` / `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` (GHS donations)
- `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (USD)
- `RESEND_API_KEY` / `EMAIL_FROM` / `CONTACT_INBOX`
- `CLOUDINARY_URL` or cloud name + API key/secret
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (optional)

Without payment/email/media keys, the site still runs; donations and emails return friendly errors or log to the console in development.

## Third-party accounts (paid / free tiers)

| Service | Purpose | Required for |
|---------|---------|--------------|
| [Neon](https://neon.tech) or [Supabase](https://supabase.com) | Production Postgres | Deploy |
| [Vercel](https://vercel.com) | Hosting | Deploy |
| [Paystack](https://paystack.com) | GHS card + mobile money | Live donations (GH) |
| [Stripe](https://stripe.com) | USD card donations | International donations |
| [Resend](https://resend.com) | Transactional email | Forms & receipts |
| [Cloudinary](https://cloudinary.com) | Image CDN/uploads | Admin media |
| [Plausible](https://plausible.io) | Privacy analytics | Optional |

## Webhooks (test mode)

Point providers at your tunnel (e.g. ngrok) or Vercel URLs:

- Paystack: `POST /api/webhooks/paystack`
- Stripe: `POST /api/webhooks/stripe`

Signatures are verified server-side before marking donations as paid.

## Project structure

```
app/(public)/     Public pages
app/admin/        Admin dashboard (auth-gated)
app/actions/      Server Actions (forms, donate, admin CRUD)
app/api/          Auth, webhooks, CSV export, OG
components/       UI, layout, home sections, forms, admin
lib/              Prisma, auth, email, payments, validation
prisma/           Schema + seed (verbatim prototype copy)
```

## Design tokens

Brand colors (rose / gold / cream / ink) and typography (Playfair Display + DM Sans) are defined in `app/globals.css`. Images tagged `PLACEHOLDER_IMAGE` in comments should be swapped before launch.

## Deploy

1. Provision Neon/Supabase Postgres and set `DATABASE_URL`
2. Set all secrets in Vercel
3. `npx prisma db push` (or migrate) against production
4. `npm run db:seed` once (optional)
5. Deploy to Vercel

## License

Private — The Girl Can Foundation.
