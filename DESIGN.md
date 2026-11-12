# Design: Project GARUDA website

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.

## System
- Look: motorsport. Full-screen photo headers, condensed slanted capitals, the club green used loudly, slanted buttons and stripe accents.
- Typeface: Saira only. Headlines in its condensed width, 800, italic, capitals; labels and buttons in capitals at 82% width; body text regular.
- Colour: deep black and #2bff00. One green word per page headline, green figures, green stripe above every section heading, a green band to close the home page.

## Pages
- `/` full-screen car hero, ticker of race venues, sponsor and student photo doors, results (figures, then the timing board), GAJA, statement; nav links are slanted condensed capitals
- `/about` the record by year · `/team` captain, disciplines, management · `/builds` every car under its sticky year
- `/gallery` filtered masonry grid · `/sponsors` figures, results, reasons, tiers, enquiry form · `/join` why join, roles, steps, Google Form · `/contact` routes and address

## Tokens
`garuda-web/assets/css/tokens.css` is the source of truth. The roles:
```css
:root {
  --color-paper: oklch(12% 0.006 145);  --color-paper-2: oklch(17% 0.01 145);  --color-paper-3: oklch(22% 0.012 145);
  --color-ink: oklch(95% 0.01 140);  --color-ink-2: oklch(80% 0.012 140);  --color-muted: oklch(66% 0.012 140);  --color-rule: oklch(30% 0.012 145);
  --color-accent: oklch(86.9% 0.291 141.8);  /* #2bff00 */  --color-accent-ink: oklch(17% 0.03 145);  --color-focus: var(--color-accent);
  --font-display: "Saira", ...;  --font-body: "Saira", ...;  --display-stretch: 68%;
  --radius-card: 2px;  --radius-pill: 999px;  --rule-hair: 1px;  --shadow-card: none;
}
```
The spacing scale, the type scale, the easings and the durations live in `tokens.css`.

## Rules
- Every page opens with a full-width photo header (`.page-hero`) with a green stripe along its bottom edge.
- Every section heading gets the slanted green stripe above it (automatic for h2 inside main).
- One typeface everywhere, so the slanted capitals and the body text always belong together.
- Footer: one compact block. No giant wordmark.

## Controls
- Primary: slanted green block, dark capitals, 52px tall
- Secondary: slanted white outline; on the green band, slanted black blocks
- Text links: capitals with a green underline

## Motion
- Lives in `garuda-web/assets/css/motion.css`; `main.js` tags elements and plays each reveal once.
- Load: the hero headline wipes up, the line and buttons follow. The venue ticker scrolls and pauses on hover.
- Scroll: the hero photo sinks slower than the page while its text fades; a 2px green progress line rides under the nav; section headings wipe up; photos open from a smaller window; cards rise one by one in grids; tier colour bars draw in; figures count up to their real values; door and backdrop photos drift slightly in their frames; the About timeline spine fills green.
- Never on body text, no scroll-jacking or pinned sections. Reduced motion and no script get the finished page; printing gets everything visible.

## Exports
`tokens.css` in this project. Tailwind, DTCG or shadcn blocks can be added here on request.

## Audiences
- Every page serves sponsors (proof, tiers, the deck, the enquiry form) and juniors (what you get, roles, the process, the application). The home page splits them into two equal doors right after the figures.
- Footer: one compact block (logo and line, three link columns, the legal line). No giant wordmark.
