// Booking form: prefill from the test list, keep dates on lab days, submit to Netlify Forms.
(function () {
  const $ = (s) => document.querySelector(s)
  const form = $('#bookingForm')
  const cart = MTCart.get()
  const patient = JSON.parse(sessionStorage.getItem('mt-patient') || '{}')
  if (cart.length) $('#b-tests').value = cart.join(', ')
  $('#chosen').innerHTML = cart.map((t) => `<span>${t.replace(/</g, '&lt;')}</span>`).join('')
  if (patient.pn) $('#b-name').value = patient.pn
  if (patient.dr) $('#b-doc').value = patient.dr
  const age = (patient.pa || '').match(/\d+/)
  if (age) $('#b-age').value = age[0]

  // Date limits in Indian time: today (or tomorrow if past 7 PM) up to 60 days ahead.
  const iso = (d) => d.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })
  const now = new Date()
  const start = new Date(now.getTime() + (MTHours.ist().mins >= 1140 ? 864e5 : 0))
  $('#b-date').min = iso(start)
  $('#b-date').max = iso(new Date(now.getTime() + 60 * 864e5))
  $('#b-date').addEventListener('change', (e) => {
    const sunday = e.target.value && new Date(e.target.value + 'T12:00:00Z').getUTCDay() === 0
    e.target.setCustomValidity(sunday ? 'The lab is closed on Sunday. Please choose Monday to Saturday.' : '')
    $('#date-hint').textContent = sunday ? 'Closed on Sunday — please choose another day.' : 'Monday to Saturday.'
  })

  form.addEventListener('change', (e) => {
    if (e.target.name === 'collection') $('#addr-wrap').hidden = e.target.value !== 'Ask about home collection'
  })

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const err = $('#b-err')
    err.hidden = true
    const btn = form.querySelector('[type=submit]')
    btn.disabled = true
    try {
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(form)).toString() })
      if (!res.ok) throw new Error(res.status)
      sessionStorage.setItem('mt-last-booking', JSON.stringify({ name: $('#b-name').value, tests: $('#b-tests').value, date: $('#b-date').value, time: $('#b-time').value }))
      MTCart.set([])
      location.href = '/thank-you'
    } catch {
      err.textContent = navigator.onLine ? 'Sorry, the request could not be sent. Please try again, or call / WhatsApp 93705 91948.' : 'You appear to be offline. Please reconnect, or call 93705 91948.'
      err.hidden = false
      btn.disabled = false
    }
  })
})()
