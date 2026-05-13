import { getRestauracje } from './api.js'
import { saveFilters, loadFilters } from './storage.js'

let restauracje = []

// Elementy HTML
const lista = document.getElementById('restaurant-list')
const cuisineSelect = document.getElementById('cuisine')
const sortSelect = document.getElementById('sort')

// Funkcja generująca karty restauracji
function render() {
  const selectedCuisine = cuisineSelect.value
  const sortBy = sortSelect.value

  saveFilters(selectedCuisine, sortBy)

  let filtered = restauracje.filter(r => {
    return selectedCuisine === 'all' || r.kuchnia === selectedCuisine
  })

  filtered.sort((a, b) => {
    const aVal = Number(a[sortBy === 'price' ? 'sredniaCena' : 'czasDostawy'])
    const bVal = Number(b[sortBy === 'price' ? 'sredniaCena' : 'czasDostawy'])
    return aVal - bVal
  })

  lista.innerHTML = ''

  filtered.forEach(rest => {
    const card = document.createElement('div')
    card.classList.add('restaurant-card')
    card.dataset.cuisine = rest.kuchnia
    card.dataset.price = rest.sredniaCena
    card.dataset.time = rest.czasDostawy

    card.innerHTML = `
      <h2>${rest.nazwa}</h2>
      <p>Średnia cena: ${rest.sredniaCena} zł</p>
      <p>Czas dostawy: ${rest.czasDostawy} min</p>
      <a href="${rest.link}">Zobacz menu</a>
    `
    lista.appendChild(card)
  })
}

// Po załadowaniu strony
document.addEventListener('DOMContentLoaded', async () => {
  restauracje = await getRestauracje()

  const filters = loadFilters()
  cuisineSelect.value = filters.cuisine
  sortSelect.value = filters.sort

  cuisineSelect.addEventListener('change', render)
  sortSelect.addEventListener('change', render)

  render()
})

