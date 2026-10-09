// Shows a short summary of the booking just sent (stored only in this browser tab).
(function () {
  const b = JSON.parse(sessionStorage.getItem('mt-last-booking') || 'null')
  if (!b) return
  const esc = (s) => String(s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
  const el = document.getElementById('summary')
  el.innerHTML = `<h3>Your request</h3><p style="margin:0"><b>Patient:</b> ${esc(b.name)}<br><b>Tests:</b> ${esc(b.tests)}<br><b>Preferred:</b> ${esc(b.date)}, ${esc(b.time)}</p>`
  el.hidden = false
  sessionStorage.removeItem('mt-last-booking')
})()
