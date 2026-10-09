// Builds the static site: copies /public and wraps every page in /src/pages with the shared layout.
// Run by Netlify at build time (see netlify.toml). Output goes to /dist.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, cpSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE, ICONS } from './site.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'dist')
rmSync(out, { recursive: true, force: true })
mkdirSync(out, { recursive: true })
cpSync(join(root, 'public'), out, { recursive: true })

const icon = (name) => ICONS[name] || ''
const NAV = [
  { id: 'home', href: '/', label: 'Home', icon: 'home' },
  { id: 'tests', href: '/tests', label: 'Tests', icon: 'flask' },
  { id: 'book', href: '/book', label: 'Book', icon: 'calendar' },
  { id: 'preparation', href: '/preparation', label: 'Prepare', icon: 'clipboard' },
  { id: 'doctors', href: '/doctors', label: 'For doctors', icon: 'steth' },
  { id: 'contact', href: '/contact', label: 'Contact', icon: 'pin' },
]
const TABS = ['home', 'tests', 'book', 'preparation', 'contact']

const header = (nav) => `
<a class="skip" href="#main">Skip to content</a>
<header class="top"><div class="wrap">
  <a class="brand" href="/" aria-label="${SITE.name} home"><img src="/images/logo.png" alt="" width="44" height="44"><span><b>${SITE.name}</b><small>Diagnostic Centre · ${SITE.town}</small></span></a>
  <nav class="nav" aria-label="Main">${NAV.map((n) => `<a href="${n.href}"${n.id === nav ? ' aria-current="page"' : ''}>${n.label}</a>`).join('')}</nav>
  <span class="status" data-open-status>Mon–Sat 8 AM–7:30 PM</span>
  <a class="btn sm call" href="tel:${SITE.phone1Tel}">${icon('phone')}Call</a>
</div></header>`

const tabbar = (nav) => `
<nav class="tabbar" aria-label="App navigation">${NAV.filter((n) => TABS.includes(n.id)).map((n) => `<a href="${n.href}"${n.id === nav ? ' aria-current="page"' : ''}>${icon(n.icon)}<span>${n.id === 'preparation' ? 'Prepare' : n.label}</span>${n.id === 'tests' ? '<span class="n" data-cart-count></span>' : ''}</a>`).join('')}</nav>`

const footer = `
<footer class="foot"><div class="wrap">
  <div>
    <a class="brand" href="/"><img src="/images/logo.png" alt="" width="44" height="44"><span><b>${SITE.name}</b><small>${SITE.tagline}</small></span></a>
    <p style="margin-top:14px">${SITE.address}<br>Open ${SITE.hoursText}</p>
  </div>
  <div><h4>Patients</h4><ul><li><a href="/tests">Test directory</a></li><li><a href="/book">Book a test</a></li><li><a href="/preparation">Test preparation</a></li><li><a href="/app">Install the app</a></li></ul></div>
  <div><h4>Healthcare</h4><ul><li><a href="/doctors">For doctors &amp; clinics</a></li><li><a href="/tests#print">Print a requisition</a></li><li><a href="/doctors#referral">Referral lab network</a></li></ul></div>
  <div><h4>Contact</h4><ul><li><a href="tel:${SITE.phone1Tel}">${SITE.phone1}</a></li><li><a href="tel:${SITE.phone2Tel}">${SITE.phone2}</a></li><li><a href="https://wa.me/${SITE.whatsapp}" rel="noopener" target="_blank">WhatsApp us</a></li><li><a href="/privacy">Privacy &amp; medical disclaimer</a></li></ul></div>
  <div class="foot-b"><span>© <span data-year>2026</span> ${SITE.name}, ${SITE.town}. ${SITE.tagline}.</span><span>Information on this site is general and does not replace advice from your doctor.</span></div>
</div></footer>
<div class="install-banner" data-install-banner role="dialog" aria-label="Install the app"><img src="/images/icon-192.png" alt=""><p><b>Install the Meditech app</b><br>Tests, preparation and booking on your home screen.</p><button class="btn sm" data-install>Install</button><button class="x" data-install-dismiss aria-label="Dismiss">×</button></div>`

const layout = (meta, body) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${meta.title}</title>
<meta name="description" content="${meta.desc}">
<meta name="theme-color" content="#0b1f8f">${meta.noindex ? '\n<meta name="robots" content="noindex">' : ''}
<link rel="canonical" href="${SITE.url}${meta.path}">
<meta property="og:type" content="website">
<meta property="og:title" content="${meta.title}">
<meta property="og:description" content="${meta.desc}">
<meta property="og:image" content="${SITE.url}/images/flyer.jpg">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="icon" href="/images/icon-192.png">
<link rel="apple-touch-icon" href="/images/icon-192.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Meditech Lab">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Source+Sans+3:wght@400;600&display=swap">
<link rel="stylesheet" href="/css/style.css">
${meta.path === '/' ? `<script type="application/ld+json">${JSON.stringify(SITE.schema)}</script>` : ''}
</head>
<body data-page="${meta.nav}">
${header(meta.nav)}
<main id="main">
${body}
</main>
${footer}
${tabbar(meta.nav)}
<script src="/js/tests-data.js"></script>
<script src="/js/app.js"></script>
${(meta.scripts || []).map((s) => `<script src="/js/${s}"></script>`).join('\n')}
</body>
</html>
`

const pagesDir = join(root, 'src', 'pages')
const indexed = []
for (const file of readdirSync(pagesDir).filter((f) => f.endsWith('.html'))) {
  const raw = readFileSync(join(pagesDir, file), 'utf8')
  const m = raw.match(/^<!--(\{[\s\S]*?\})-->\s*/)
  if (!m) throw new Error(`${file}: missing meta comment`)
  const meta = JSON.parse(m[1])
  const body = raw
    .slice(m[0].length)
    .replace(/\{\{icon:([a-z-]+)\}\}/g, (_, n) => icon(n))
    .replace(/\{\{(\w+)\}\}/g, (_, k) => SITE[k] ?? `{{${k}}}`)
  writeFileSync(join(out, file), layout(meta, body))
  if (!meta.noindex) indexed.push(meta.path)
}
writeFileSync(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexed.map((p) => `  <url><loc>${SITE.url}${p}</loc></url>`).join('\n')}\n</urlset>\n`)
writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE.url}/sitemap.xml\n`)
console.log('Built site into dist/')
