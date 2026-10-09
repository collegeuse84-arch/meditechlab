// Test directory: search, category filters, test list, WhatsApp enquiry and printable requisition.
(function () {
  const $ = (s) => document.querySelector(s)
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
  const CATS = window.CATEGORIES
  const params = new URLSearchParams(location.search)
  let cat = params.get('cat') || 'all'
  $('#q').value = params.get('q') || ''

  const fields = ['pn', 'pa', 'dr']
  const saved = JSON.parse(sessionStorage.getItem('mt-patient') || '{}')
  fields.forEach((id) => { $('#' + id).value = saved[id] || ''; $('#' + id).addEventListener('input', savePatient) })
  function savePatient() { sessionStorage.setItem('mt-patient', JSON.stringify(Object.fromEntries(fields.map((id) => [id, $('#' + id).value.trim()])))) }

  function chips() {
    $('#chips').innerHTML = [{ id: 'all', name: 'All tests' }, ...CATS].map((c) => `<button class="chip" aria-pressed="${c.id === cat}" data-c="${c.id}">${esc(c.name)}</button>`).join('')
  }

  function render() {
    const q = $('#q').value.trim().toLowerCase()
    const cart = MTCart.get()
    let n = 0
    const html = CATS.filter((c) => cat === 'all' || c.id === cat).map((c) => {
      const catHit = c.name.toLowerCase().includes(q)
      const tests = c.tests.filter((t) => !q || catHit || [t.n, t.d, t.s].join(' ').toLowerCase().includes(q))
      if (!tests.length) return ''
      n += c.referral ? 0 : tests.length
      const head = `<div class="cat-h"><span class="badge" aria-hidden="true">${c.code}</span><div><h3>${esc(c.name)}</h3><p>${esc(c.about)}</p></div></div>${c.note ? `<p class="note">${esc(c.note)}</p>` : ''}`
      if (c.referral) return `<section class="cat" id="${c.id}">${head}<div class="refs">${tests.map((t) => `<span>${esc(t.n)}</span>`).join('')}</div></section>`
      return `<section class="cat" id="${c.id}">${head}<ul class="tlist">${tests.map((t, i) => {
        const id = `t-${c.id}-${i}`
        return `<li class="test"><input type="checkbox" id="${id}" data-t="${esc(t.n)}" ${cart.includes(t.n) ? 'checked' : ''}><label for="${id}">${esc(t.n)}</label>${t.f ? '<span class="tag">Fasting may be needed</span>' : '<span></span>'}<div class="meta"><b>Sample:</b> ${esc(t.s)}. ${esc(t.d)}</div>${t.p ? `<details><summary>How to prepare</summary><p>${esc(t.p)}</p></details>` : ''}</li>`
      }).join('')}</ul></section>`
    }).join('')
    $('#list').innerHTML = html || `<div class="card empty"><p><b>No test found for “${esc(q)}”.</b></p><p>Try another name, or call <a href="tel:+919370591948">93705 91948</a>. Specialised tests can be sent to our partner labs.</p></div>`
    $('#count').textContent = `${n} test${n === 1 ? '' : 's'} shown`
  }

  function basket() {
    const cart = MTCart.get()
    $('#cn').textContent = cart.length
    $('#fab').hidden = !cart.length
    $('#sel').innerHTML = cart.length
      ? cart.map((x) => `<li><span>${esc(x)}</span><button data-r="${esc(x)}" aria-label="Remove ${esc(x)}">×</button></li>`).join('')
      : '<li class="muted">No tests selected yet. Tick tests in the directory.</li>'
  }

  document.addEventListener('change', (e) => {
    const t = e.target.dataset.t
    if (!t) return
    const cart = MTCart.get()
    MTCart.set(e.target.checked ? [...new Set([...cart, t])] : cart.filter((x) => x !== t))
    basket()
  })
  document.addEventListener('click', (e) => {
    const c = e.target.closest('[data-c]')
    if (c) { cat = c.dataset.c; chips(); render() }
    const r = e.target.closest('[data-r]')
    if (r) { MTCart.set(MTCart.get().filter((x) => x !== r.dataset.r)); basket(); render() }
  })
  let tmr
  $('#q').addEventListener('input', () => { clearTimeout(tmr); tmr = setTimeout(render, 120) })
  $('#clear').onclick = () => { if (!MTCart.get().length || confirm('Clear all selected tests?')) { MTCart.set([]); basket(); render() } }

  $('#send').onclick = () => {
    const cart = MTCart.get()
    const nm = $('#pn').value.trim(), ag = $('#pa').value.trim(), dr = $('#dr').value.trim()
    if (!cart.length) return alert('Please select at least one test.')
    if (!nm) { $('#pn').focus(); return alert('Please enter the patient name.') }
    const msg = `Hello Meditech Laboratory,\nI would like to enquire / book these tests:\n${cart.map((x, i) => `${i + 1}. ${x}`).join('\n')}\n\nPatient: ${nm}${ag ? `\nAge / Sex: ${ag}` : ''}${dr ? `\nReferring doctor: ${dr}` : ''}\n\nPlease confirm timing and preparation.`
    open(`https://wa.me/919370591948?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
  }

  $('#printBtn').onclick = () => {
    if (!MTCart.get().length) return alert('Please select at least one test to print.')
    document.querySelectorAll('[data-p]').forEach((el) => {
      const k = el.dataset.p
      el.textContent = k === 'date' ? new Date().toLocaleDateString('en-IN') : $('#' + k).value.trim()
    })
    print()
  }

  chips(); render(); basket()
  if (cat !== 'all') document.getElementById(cat)?.scrollIntoView()
})()
