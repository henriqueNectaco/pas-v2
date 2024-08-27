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
export function formatarData(dataString) {
  const dataOriginal = new Date(dataString)

  const dia = dataOriginal.getDate().toString().padStart(2, '0')
  const mes = (dataOriginal.getMonth() + 1).toString().padStart(2, '0') // Os meses são indexados a partir de 0
  const ano = dataOriginal.getFullYear().toString()
  const hora = dataOriginal.getHours().toString().padStart(2, '0')
  const minutos = dataOriginal.getMinutes().toString().padStart(2, '0')

  const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minutos}`

  return dataFormatada
}
