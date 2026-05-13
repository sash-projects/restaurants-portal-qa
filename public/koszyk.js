import { loadCart, saveCart } from './storage.js'

document.addEventListener('DOMContentLoaded', () => {
  const lista = document.getElementById('lista-koszyk')
  const sumaElem = document.getElementById('suma')
  const form = document.querySelector('.order-form')

  let koszyk = loadCart()
  let suma = 0

  function przeliczSume() {
    suma = koszyk.reduce((acc, item) => acc + item.cena, 0)
    sumaElem.textContent = suma
  }

  function odswiezListe() {
    lista.innerHTML = ''
    koszyk.forEach((item, index) => {
      const li = document.createElement('li')
      li.textContent = `${item.nazwa} - ${item.cena} zł `

      const usunBtn = document.createElement('button')
      usunBtn.textContent = '🗑️ Usuń'
      usunBtn.classList.add('usun-z-koszyka')  

      usunBtn.addEventListener('click', () => {
        koszyk.splice(index, 1)
        saveCart(koszyk)
        odswiezListe()
        przeliczSume()
      })

      li.appendChild(usunBtn)
      lista.appendChild(li)
    })
  }

  odswiezListe()
  przeliczSume()

  form?.addEventListener('submit', e => {
    e.preventDefault()
    localStorage.removeItem('koszyk')
    form.reset()
    lista.innerHTML = ''
    sumaElem.textContent = '0'
    window.location.href = 'potwierdzenie.html' 
  })
})
