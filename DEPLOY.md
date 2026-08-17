# Deploying the demo

The app is a **static export** (`output: "export"` in `next.config.ts`). `npm run build`
writes a fully static site to `out/`, which can be hosted anywhere — no Node runtime
needed.

```bash
npm run build
```

## Vercel (simplest — recommended for the client review link)

Vercel detects Next.js automatically and needs no configuration.

```bash
npx vercel deploy --prod
```

First run asks you to link a project; accept the defaults. If this repo is pushed to
GitHub, connecting it in the Vercel dashboard gives you automatic preview URLs on every
push, which is useful while the client is reviewing.

**Note:** the git repository is rooted at `web/`, so Vercel's "Root Directory" setting
should stay at its default. If you later move the repo root up a level, set Root
Directory to `web`.

## Firebase Hosting

`firebase.json` is already configured to serve `out/`.

```bash
npm run build
npx firebase-tools login
npx firebase-tools use --add          # pick or create the project, alias it "default"
npx firebase-tools deploy --only hosting
```

## Anywhere else

`out/` is plain static files. Netlify, Cloudflare Pages, S3 + CloudFront, or even the
client's existing server will serve it as-is.

## What the client should know when they open the link

- It is a **frontend prototype**. Cart, checkout, accounts and search are not wired —
  buttons that would transact are deliberately inert.
- All product data, specs, prices, ratings and review counts are **real**, taken from
  the live maddog.co.in on 2026-08-16.
- Product photography is loaded from Maddog's own CloudFront CDN.
- The night-road scenes in the hero and anti-glare sections are **CSS/SVG renders**, not
  photographs. They stand in for the reference night shoot, which is the one asset that
  has to be produced before this design can ship for real.
