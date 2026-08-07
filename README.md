# SHARIO

Marketing site for Shario — a founder-led digital marketing company in Dubai.

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Pages

| Route                    | Contents                                               |
| ------------------------ | ------------------------------------------------------ |
| `/`                      | Hero, proof ledger, founder-led, what we do, industries |
| `/about`                 | The founder, four commitments, how we work              |
| `/services`              | Index of the five services                              |
| `/services/[slug]`       | One page per service, prerendered from `services`       |
| `/results`               | The numbers, industries, why it works                   |
| `/contact`               | Contact details, what happens next, enquiry form        |

Adding a service means adding one entry to `services` in `lib/site.ts` — the
page, its metadata, the nav dropdown, the footer, the sitemap and the
prev/next links all follow from it.

All copy comes from the client's `Shario content` document. Edit it in one
place: **`lib/site.ts`** holds contact details, the service list, the proof
figures and the industries. Page-specific prose lives in the page files.

## Design system

Set by `SHARIO_Brand_Guidelines.pdf` and `SHARIO_Typography_Guide.pdf`, and
implemented as tokens in `app/globals.css`:

| Token          | Value     | Role                        |
| -------------- | --------- | --------------------------- |
| Porcelain      | `#F1EEE7` | Page ground                 |
| Limestone      | `#D6CEC2` | Dominant brand field        |
| Carbon         | `#252525` | Typography and contrast     |
| Powder Mist Blue | `#A8C4CD` | Selective accent          |
| Platinum       | `#B8B8B3` | Finishing accent            |

Type: **Cormorant Garamond** (headlines and figures), **EB Garamond** (body),
**Jost** (labels, UI, captions) — loaded via `next/font`.

The signature treatment is the **ledger measure** (`.ledger` / `LedgerEntry`):
figures set in the display serif over a hairline with a Jost micro-label, rather
than conventional stat cards.

### Motion

Quiet by direction: a load sequence (`.rise`), a drawn rule (`.draw`), and
scroll reveals (`.reveal`, driven by `components/reveal.tsx`).

Reveals are gated behind a `js` class set on `<html>` before first paint, so
content is **visible by default** — without JavaScript, in print, and for any
crawler that does not scroll, nothing stays hidden.
`prefers-reduced-motion` is respected throughout.

## Brand assets

Master artwork lives in `assets/brand-source/` and is **not** served. The
wordmark ships with a flat background baked in, so a one-time script knocks it
out to alpha and trims it into `public/brand/`:

```bash
npm run brand:assets
```

The letterforms are never redrawn or re-typeset — the guidelines require the
supplied wordmark be used as master artwork.

## Enquiry form

`components/enquiry-form.tsx` posts to the `submitEnquiry` server action in
`app/actions.ts`. It validates server-side, carries a honeypot field, and works
without JavaScript.

Delivery goes through **Resend**. Until these are set, the form tells the
visitor to email or call instead — it never reports a false success:

| Variable             | Purpose                                      |
| -------------------- | -------------------------------------------- |
| `RESEND_API_KEY`     | Provisioned by the Vercel Resend integration |
| `ENQUIRY_FROM_EMAIL` | Verified sender, e.g. `hello@shario.ae`      |
| `ENQUIRY_TO_EMAIL`   | Where enquiries land (defaults to the founder's address) |

To provision:

```bash
vercel link
vercel integration add resend/resend-email
vercel env pull
```

## Before launch

- Set `site.domain` in `lib/site.ts` to the real domain — it drives canonical
  URLs, `sitemap.xml`, `robots.txt` and Open Graph metadata.
- Provision Resend and set the sender address.
- Add an Open Graph share image.
- Consider a real photograph of the founder on `/about`, where the S monogram
  currently stands in.
