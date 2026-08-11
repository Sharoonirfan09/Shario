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
page, its metadata, the two service grids, the footer, the sitemap, the
enquiry form's dropdown and the prev/next links all follow from it.

Every block appears on exactly **one** page: the four-step engagement is on
`/about`, the sector list is on `/results`, the FAQs are on the service pages.
Repeating one across templates is what made the previous structure feel
padded — resist it.

All copy comes from the client's `Shario content` document. Edit it in one
place: **`lib/site.ts`** holds contact details, the service list, the proof
figures and the industries. Page-specific prose lives in the page files.

## Design system

**Composition** follows the reference the client supplied,
`upscale-digital.com`: a centred eyebrow over a centred heading on every
section, hairline card grids with numbered badges, dark bands of figures
breaking up the light ones, a services dropdown grouped by category, and an
accent band carrying the call to action immediately before the footer.

**Material** is Shario's own and does not come from that reference — its
purple, its rounded cards and its geometric sans are all deliberately absent.
Cards stay square-cornered because this system declares `999px` as its only
radius, reserved for pills.

Palette and type are set by `SHARIO_Brand_Guidelines.pdf` and
`SHARIO_Typography_Guide.pdf`, and implemented as tokens in `app/globals.css`:

| Token          | Value     | Role                        |
| -------------- | --------- | --------------------------- |
| Porcelain      | `#F1EEE7` | Page ground                 |
| Limestone      | `#D6CEC2` | Dominant brand field        |
| Carbon         | `#252525` | Typography and contrast     |
| Powder Mist Blue | `#ABBFC7` | Selective accent          |
| Platinum       | `#B8B8B3` | Finishing accent            |

Type: **Cormorant Garamond** (headlines and figures), **EB Garamond** (body),
**Jost** (labels, UI, captions) — loaded via `next/font`.

The signature treatment is the **ledger measure** (`.ledger` in `globals.css`,
rendered by `StatRow`): figures set in the display serif over a hairline with a
Jost micro-label, rather than conventional stat cards.

### Photography

Two rules, both enforced by `npm run check:images`: **one photograph per slot**,
and **no photograph on more than one page**. Run it after touching imagery.

A third rule is enforced by convention, not by script: **no picture stands
bare.** Anything that is not a hero or a full-bleed statement goes through
`Figure`, which pairs the image with a label naming what it shows and a line
saying why it is on that page.

`public/images/book` holds 35 photographs, but **20 of them display the retired
"A Symphony of Identity" tagline** and must never appear on the site:

`brand-book-floor` · `desk-poster` · `digital-instagram` · `digital-laptop` ·
`digital-linkedin` · `digital-monitor` · `digital-phone` · `digital-tablet` ·
`emboss-monogram` · `folder-copy` · `invoice-desk` · `materials-flatlay` ·
`photo-book` · `photo-lounge` · `proposal-anthology` · `proposal-cover` ·
`reception-wall` · `sign-exterior` · `sign-glass` · `sign-tablet` ·
`stat-card` · `stat-folder` · `stat-invoice` · `stat-proposal`

Two more are unusable for a different reason: `cover-arabic` and `invoice-desk`
print the **old phone number and email**, which contradict `site`.

That leaves roughly eleven usable originals. `public/images/detail` holds crops
taken from four of the excluded files, framed to exclude the tagline — this is
how the library was extended without new photography. Verify any new crop by
eye before using it; the tagline is often set very small.

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
- Replace `site.email` with a real `@shario.ae` address — the content document
  gives a personal Gmail, which undercuts the credibility the copy argues for.
- Add a real photograph of the founder to `/about`; there is none in the
  library, so the page currently runs on architectural photography.
