export function arrayOfObjectsSumJs(arr, key) {
  if (!Array.isArray(arr)) {
    throw new Error('O parâmetro "arr" deve ser um array.')
  }

  return arr.reduce((sum, obj) => {
    // Convertendo o valor para número e garantindo que seja zero se não for um número válido
    const value = parseFloat(String(obj[key])) || 0
    return sum + value
  }, 0)
}
