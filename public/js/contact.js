// Highlights today's row in the opening-hours table.
(function () {
  const row = document.querySelector(`#hours [data-d="${MTHours.ist().day}"]`)
  if (row) row.classList.add('today')
})()
