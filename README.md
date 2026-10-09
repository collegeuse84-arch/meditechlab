# Meditech Laboratory, Mahad — website & app

Public website and installable mobile app (Progressive Web App) for Meditech Laboratory, Bhanudas Complex, Mahad.
Patients can search about 100 tests with sample type and preparation advice, build a test list, send it on WhatsApp,
submit a booking request, and install the site as an app on Android, iPhone or desktop. Doctors get a specimen
reference, a printable requisition and an enquiry form.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: services, popular tests, how booking works, doctor section, FAQ, contact |
| `/tests` | Searchable test directory with test list, WhatsApp enquiry and printable requisition |
| `/book` | Booking request form (Netlify Forms: `booking`) |
| `/preparation` | Patient preparation guide (fasting, GTT, urine, stool, semen, hormones, medicines) |
| `/doctors` | Information for clinicians and enquiry form (Netlify Forms: `doctor-enquiry`) |
| `/contact` | Address, hours, live open/closed status and message form (Netlify Forms: `contact`) |
| `/app` | How to install the app |
| `/privacy` | Privacy notice and medical disclaimer |

## Technology

- Plain HTML, CSS and JavaScript — no framework, fast on low-end phones and slow networks.
- A tiny Node script (`scripts/build.mjs`) wraps each page in `src/pages/` with the shared header, footer and mobile tab bar, and writes `dist/` with a sitemap and robots.txt.
- Netlify Forms stores booking, contact and doctor enquiries (view them under **Forms** in the Netlify dashboard; set up email notifications under Project configuration → Notifications).
- Netlify Image CDN serves the flyer as resized WebP.
- Service worker (`public/sw.js`) and web manifest make the site installable and usable offline.

## Run locally

```bash
node scripts/build.mjs       # writes dist/
netlify dev --dir dist       # or any static file server pointed at dist/
```

## Updating content

- Contact details, hours and address: `scripts/site.mjs`
- Tests, samples and preparation: `public/js/tests-data.js`
- Page content: `src/pages/*.html`
- After changing cached files, bump `VERSION` in `public/sw.js` so installed apps refresh.
