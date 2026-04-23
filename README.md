# Alarmel Mangai — Voice Artist Portfolio

A single-page site showcasing **52 voice samples in Tamil** — commercials, documentaries, children's audiobooks, Tamil short stories, devotional and classical recitations. Built for my mother, who has been recording for over two decades.

🔊 **Live site:** https://santhoshguru.github.io/alarmel-portfolio/

---

## Why this exists

My mother has spent years doing voice work — children's audiobooks, wellness commercials, Tamil literature, classical Tamil recitations — and sharing samples with clients over WhatsApp voice notes and Dropbox links. I wanted her to have a home on the internet as considered as the work itself.

More importantly, I wanted her to *own* it. She is not a developer. If a new recording comes in next month, the system has to let her add it without calling me.

## How I approached it — as a product manager, not an engineer

I work in product management. I don't ship production code for a living. For this project I used Claude Code as an implementation partner while I owned the product decisions — scoping, schema, user workflow, and the tradeoffs. What I'd want a recruiter reading this repo to notice isn't the JSX. It's the thinking behind the choices.

A few of the decisions I'd happily walk through in an interview:

**A spreadsheet is the CMS.** My mother already knows how to edit a CSV. Introducing a "content management system" — Contentful, Sanity, Notion — would have bought her nothing but new software to learn. So the source of truth is one file: `public/portfolio.csv`. Six columns. That is the whole backend.

**`Display: yes/no` beats deletion.** She wanted to be able to upload now and show later — for example, a recording that a client hasn't yet cleared for public use. A single-column flag gives her a soft-delete toggle without losing the file or the metadata. This is the kind of small UX affordance that only surfaces when you actually sit with the user.

**Validate at build, not at runtime.** If the spreadsheet points at a file that doesn't exist, the deploy fails loudly with the exact row number and filename. A broken link should be caught in CI, not when a prospective client clicks and hears silence. Boring; important.

**Auto-extract, don't ask.** MP3 durations are read from the file headers during build. One less field for her to fill in. One less way for the displayed duration to drift from reality.

**Simpler-and-working beats clever-and-hacky.** The first pass had a Web Audio synthesizer generating tone-like "voice samples" as a placeholder — technically neat, practically useless. Once the real recordings arrived I deleted all of it and replaced it with a plain `<audio>` element. Fewer lines, more robust, and it does the only thing the user needs: play the file.

## The pipeline, end to end

```
  public/portfolio.csv   +   public/audio/*.mp3
               │
               ▼
   scripts/build-manifest.mjs   (parse · validate · extract durations · sort)
               │
               ▼
         src/tracks.json
               │
               ▼
   React app (Vite)  →  GitHub Actions  →  GitHub Pages
```

Every `git push` regenerates the manifest, runs the build, and redeploys in about 90 seconds. No server to maintain. No CMS subscription. No separate content-sync step. The CSV is the truth.

## Stack

- **Vite + React** — static single-page app
- **`music-metadata`** — reads MP3 duration at build time
- **`csv-parse`** — parses the manifest
- **GitHub Pages** + **GitHub Actions** — build and deploy on every push
- Total infrastructure cost: **$0/month**

## Updating the site (for my mother, and anyone curious)

1. Drop the new MP3 into `public/audio/`.
2. Add a row to `public/portfolio.csv`:
   `Filename, Title, Category, Description, Display (yes), Order (blank)`.
3. Commit and push.

The live site updates in about a minute. To hide a track without deleting it, flip its `Display` column to `no`. To pin a track earlier in its category, set `Order` to a low number.

## About me

I'm **Santhosh Guru** — product manager. This repo is one of the ways I practice the craft: take a real problem with a real user, scope it tightly, ship it, and keep iterating. If you're hiring PMs who can prototype and ship end-to-end, I'd love to talk.

Find me on [LinkedIn](https://www.linkedin.com/in/santhoshguru/).
