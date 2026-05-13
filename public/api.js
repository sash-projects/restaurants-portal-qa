export async function getRestauracje() {
  try {
    const res = await fetch('https://restaurants-portal.onrender.com/restauracje')

    if (!res.ok)
      throw new Error(`Błąd serwera: ${res.status}`)

    const dane = await res.json()

    if (!Array.isArray(dane))
      throw new Error('Nieprawidłowe dane (nie jest tablicą)')

    return dane

  } catch (err) {
    console.error('Błąd pobierania restauracji:', err)
    alert('Nie udało się pobrać restauracji. Sprawdź połączenie z serwerem.')
    return []
  }
}


