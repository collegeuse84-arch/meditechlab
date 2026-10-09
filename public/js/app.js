// Shared app shell: open/closed status, cart badge, install prompt, offline support.
(function () {
  const $$ = (s) => document.querySelectorAll(s)
  const Cart = (window.MTCart = {
    get() { try { return JSON.parse(localStorage.getItem('mt-cart') || '[]') } catch { return [] } },
    set(list) { localStorage.setItem('mt-cart', JSON.stringify(list)); Cart.badge() },
    badge() { const n = Cart.get().length; $$('[data-cart-count]').forEach((el) => { el.textContent = n || (el.closest('.tabbar') ? '' : '0') }) },
  })
  Cart.badge()
  addEventListener('storage', (e) => e.key === 'mt-cart' && Cart.badge())

  // Opening hours in India Standard Time: Mon–Sat, 08:00–20:00
  function ist() {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).map((x) => [x.type, x.value]))
    return { day: p.weekday, mins: +p.hour * 60 + +p.minute }
  }
  window.MTHours = { ist }
  function status() {
    const { day, mins } = ist()
    const workday = day !== 'Sun'
    const open = workday && mins >= 480 && mins < 1200
    let text = open ? 'Open now · until 8 PM' : workday && mins < 480 ? 'Closed · opens 8 AM' : day === 'Sat' || day === 'Sun' ? 'Closed · opens Mon 8 AM' : 'Closed · opens 7:30 AM'
    $$('[data-open-status]').forEach((el) => { el.textContent = text; el.classList.toggle('open', open) })
  }
  status(); setInterval(status, 60000)
  $$('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()))

  // Progressive Web App
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('/sw.js')
  let deferred
  const banner = document.querySelector('[data-install-banner]')
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone
  addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); deferred = e
    $$('[data-install]').forEach((b) => (b.hidden = false))
    if (banner && !standalone && !localStorage.getItem('mt-install-dismissed')) setTimeout(() => banner.classList.add('show'), 4000)
  })
  document.addEventListener('click', async (e) => {
    if (e.target.closest('[data-install]') && deferred) {
      deferred.prompt(); await deferred.userChoice; deferred = null
      banner && banner.classList.remove('show'); $$('[data-install]').forEach((b) => (b.hidden = true))
    }
    if (e.target.closest('[data-install-dismiss]')) { banner.classList.remove('show'); localStorage.setItem('mt-install-dismissed', '1') }
  })
  addEventListener('appinstalled', () => banner && banner.classList.remove('show'))
})()
