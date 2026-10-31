# Project GARUDA — Website

The club website for Project GARUDA, RVCE's super-mileage vehicle team.
Plain HTML, CSS and JavaScript: no framework, no build step, nothing to install.

## Folder layout

```
garuda-web/
  index.html  about.html  team.html  builds.html
  gallery.html  sponsors.html  join.html  contact.html  404.html
  assets/
    css/tokens.css      colours, fonts, spacing (change the look here)
    css/base.css        navbar, footer, buttons and the shared section layouts
    css/pages/*.css     one stylesheet per page
    js/main.js          navbar, footer and the scroll fade-in (every page)
    js/pages/*.js       team roster, builds entries and gallery
    data/*.json         team members, builds and gallery photos
    images/             all photos and the logo
  vercel.json           hosting settings
archive/                photos not used on the site yet
DESIGN.md               the design rules (read before adding a page)
```

## Common edits

| To change… | Edit |
|---|---|
| Team members | `assets/data/team.json` (photos go in `assets/images/team/`) |
| Cars on the Builds page | `assets/data/builds.json` (a build with no `stats` shows only its name, year and photos) |
| Gallery photos | `assets/data/gallery.json` (photos go in `assets/images/gallery/`) |
| Navbar or footer links | the lists at the top of `assets/js/main.js` |
| WhatsApp number for sponsor enquiries | `WHATSAPP_NUMBER` at the top of `assets/js/pages/sponsors.js` |
| Student application form | the two Google Form links in `join.html` |
| Page text | the matching `.html` file |
| Colours and fonts | `assets/css/tokens.css` |

A team member's photo is optional. If the file is missing, the card shows their initials.
A member with `"name": null` is listed by role, marked "name to be added".
Team photos look best in portrait (about 4:5), at least 600×750 px.

## Preview locally

The pages load their data from JSON files, so open them through a small local server
rather than by double-clicking the file:

```
cd garuda-web
npx serve
```

On Windows PowerShell, if you get "running scripts is disabled", use `npx.cmd serve` instead.

Or use the "Live Server" extension in VS Code and open `garuda-web/index.html`.

## Deploying

Vercel serves the `garuda-web` folder as-is. Push to `main` and it goes live.
`/team`, `/builds` and so on work without the `.html` thanks to `cleanUrls` in `vercel.json`.
