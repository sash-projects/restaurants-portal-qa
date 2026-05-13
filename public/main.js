import { saveFilters, loadFilters } from './storage.js'

const toggleBtn = document.getElementById('toggle-theme')
const darkTheme = document.getElementById('dark-theme')

const cuisineSelect = document.getElementById('cuisine')
const sortSelect = document.getElementById('sort')
const list = document.getElementById('restaurant-list')
const cards = Array.from(document.querySelectorAll('.restaurant-card'))

function render() {
  const selectedCuisine = cuisineSelect.value
  const sortBy = sortSelect.value

  let filtered = cards.filter(card => {
    return selectedCuisine === 'all' || card.dataset.cuisine === selectedCuisine
  })

  filtered.sort((a, b) => {
    const aVal = Number(a.dataset[sortBy])
    const bVal = Number(b.dataset[sortBy])
    return aVal - bVal
  })

  list.innerHTML = ''
  filtered.forEach(card => list.appendChild(card))
}

toggleBtn.addEventListener('click', () => {
  const isDark = !darkTheme.disabled
  darkTheme.disabled = isDark
  toggleBtn.textContent = isDark ? '🌙 Tryb ciemny' : '☀️ Tryb jasny'
})

cuisineSelect.addEventListener('change', () => {
  saveFilters()
  render()
})

sortSelect.addEventListener('change', () => {
  saveFilters()
  render()
})

document.addEventListener('DOMContentLoaded', () => {
  loadFilters()
  render()
})
