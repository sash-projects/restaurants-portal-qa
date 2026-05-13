// Zapisuje filtry
export function saveFilters(cuisine, sort) {
    localStorage.setItem('filters', JSON.stringify({ cuisine, sort }))
  }
  
  // Odczytuje zapisane filtry 
  export function loadFilters() {
    const saved = localStorage.getItem('filters')
    return saved ? JSON.parse(saved) : { cuisine: 'all', sort: 'price' }
  }
  
  // Zapisuje koszyk
  export function saveCart(cart) {
    localStorage.setItem('koszyk', JSON.stringify(cart))
  }
  
  // Odczytuje koszyk 
  export function loadCart() {
    const cart = localStorage.getItem('koszyk')
    return cart ? JSON.parse(cart) : []
  }
  
