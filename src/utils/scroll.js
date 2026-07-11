export function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
