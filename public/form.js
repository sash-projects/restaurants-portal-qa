import { loadCart, saveCart } from './storage.js'

document.addEventListener('DOMContentLoaded', () => {
  const przyciski = document.querySelectorAll('.dish button')

  // Funkcja pokazująca prosty popup bez animacji
  function pokazPopup(nazwa, cena) {
    const popup = document.getElementById('koszyk-popup')
    if (!popup) return

    popup.textContent = `🛒 Dodano do koszyka`
    popup.classList.remove('hidden')
    popup.classList.add('show')

    setTimeout(() => {
      popup.classList.remove('show')
      popup.classList.add('hidden')
    }, 3000)
  }

  przyciski.forEach(przycisk => {
    przycisk.addEventListener('click', () => {
      const dish = przycisk.closest('.dish')
      const nazwa = dish.querySelector('h3')?.textContent
      const cenaElem = dish.querySelector('.price')
      const cena = cenaElem
        ? parseFloat(cenaElem.textContent.replace(/[^\d]/g, ''))
        : 0

      if (!nazwa) return

      const koszyk = loadCart()
      koszyk.push({ nazwa, cena })
      saveCart(koszyk)

      pokazPopup(nazwa, cena)
    })
  })

  // Obsługa formularza
  const form = document.querySelector('form')

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault()
      alert('Formularz wysłany! (na razie tylko symulacja)')
      form.reset()
      localStorage.removeItem('koszyk')
    })
  }
})
