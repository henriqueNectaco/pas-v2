export function formatarData(dataString: Date): string {
  const dataOriginal = new Date(dataString)

  const dia = dataOriginal.getDate().toString().padStart(2, '0')
  const mes = (dataOriginal.getMonth() + 1).toString().padStart(2, '0') // Os meses são indexados a partir de 0
  const ano = dataOriginal.getFullYear().toString()
  const hora = dataOriginal.getHours().toString().padStart(2, '0')
  const minutos = dataOriginal.getMinutes().toString().padStart(2, '0')

  const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minutos}`

  return dataFormatada
}
export const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // getMonth() é zero-indexado
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}
export const formatDatePicker = (date: Date) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
  return new Intl.DateTimeFormat('pt-BR', options).format(date)
}

export const getLastDayOfMonth = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // Mês zero-indexado
  return new Date(year, month, 0)
}
export const format = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
