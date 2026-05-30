# Team Photos

Drop member photos in this folder. Filenames must match the `photo` slug used
in `src/app/team/page.tsx`.

## Conventions

- Format: `.jpg` (preferred) or `.png`
- Aspect: portrait, roughly **4:5** or **3:4** (cards crop to a 4:5 frame)
- Minimum: 600×750 px
- Background: ideally workshop / track / neutral; the card desaturates slightly
  and applies a subtle vignette so plain backgrounds blend fine.

## Current expected filenames

Captain:

- `abhinandhan.jpg` — Abhinandan Nandagave

Mechanical (head first, then members; matches slugs in `page.tsx`):

- `mech-head.jpg` — Ahammad Arfan K (Mechanical Head)
- `mech-1.jpg`, `mech-2.jpg`, `mech-3.jpg`, `mech-4.jpg`

Electrical:

- `ee-head.jpg` — Pranav Kamath (Electrical Head)
- `sethu.jpg` — Sethu S (Controls Engineer · POC)
- `ee-1.jpg` — Potta Siddarth

Management:

- `club-manager.jpg` — Charoo Ranjan
- `fund-manager.jpg` — Chethan
- `social-media.jpg`

## How fallbacks work

If no photo file exists at the expected path, the card shows initials inside a
hairline-bordered placeholder. As soon as you upload the file at the correct
slug, the photo replaces the initials automatically — no code change needed
(but you'll need to set `photo: "/images/team/<slug>.jpg"` in the member data
in `page.tsx` if it isn't already set).

## Adding a new member

1. Open `src/app/team/page.tsx`
2. Find the appropriate department array (`mechMembers`, `eeMembers`, `management`)
3. Add an entry. The `photo` field can be `null` (shows initials) or a path:

```ts
{
  slug: "mech-5",
  name: "Aanya Krishnan",
  role: "Composites Lead",
  contribution: "Owned the carbon-fibre layup for Mjolnir's shell.",
  photo: "/images/team/mech-5.jpg",
}
```
