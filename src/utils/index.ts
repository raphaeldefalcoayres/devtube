export function formatDuration(durationInMinutes = 0.0) {
  const hours = Math.floor(durationInMinutes / 60)
  const minutes = Math.floor(durationInMinutes % 60)
  const seconds = Math.round((durationInMinutes % 1) * 60)

  const formattedHours = hours > 0 ? String(hours).padStart(2, '0') + ':' : ''
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(seconds).padStart(2, '0')

  return formattedHours + formattedMinutes + ':' + formattedSeconds
}

export function getElapsedTime(publishTime: string): string {
  const now = new Date()
  const publishDate = new Date(publishTime)
  const elapsedSeconds = Math.floor((now.getTime() - publishDate.getTime()) / 1000)

  if (elapsedSeconds < 60) {
    return 'agora mesmo'
  } else if (elapsedSeconds < 60 * 60) {
    const minutes = Math.floor(elapsedSeconds / 60)
    return `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} atrás`
  } else if (elapsedSeconds < 60 * 60 * 24) {
    const hours = Math.floor(elapsedSeconds / (60 * 60))
    return `${hours} ${hours === 1 ? 'hora' : 'horas'} atrás`
  } else if (elapsedSeconds < 60 * 60 * 24 * 7) {
    const days = Math.floor(elapsedSeconds / (60 * 60 * 24))
    return `${days} ${days === 1 ? 'dia' : 'dias'} atrás`
  } else if (elapsedSeconds < 60 * 60 * 24 * 30) {
    const weeks = Math.floor(elapsedSeconds / (60 * 60 * 24 * 7))
    return `${weeks} ${weeks === 1 ? 'semana' : 'semanas'} atrás`
  } else if (elapsedSeconds < 60 * 60 * 24 * 365) {
    const months = Math.floor(elapsedSeconds / (60 * 60 * 24 * 30))
    return `${months} ${months === 1 ? 'mês' : 'meses'} atrás`
  } else {
    const years = Math.floor(elapsedSeconds / (60 * 60 * 24 * 365))
    return `${years} ${years === 1 ? 'ano' : 'anos'} atrás`
  }
}

export function calculateRelevance(positiveVotes: number, negativeVotes: number): number {
  let result = 0

  // Verifica se há pelo menos 10 votos para calcular o score de Wilson
  if (positiveVotes + negativeVotes >= 10) {
    const n = positiveVotes + negativeVotes
    const p = positiveVotes / n
    const z = 1.96 // Valor crítico para um intervalo de confiança de 95%
    const score = (p + (z * z) / (2 * n) - z * Math.sqrt((p * (1 - p) + (z * z) / (4 * n)) / n)) / (1 + (z * z) / n)

    // Exibe o score de Wilson como uma porcentagem
    const relevancePercentage = Math.round(score * 100)
    result = relevancePercentage
  }

  return result
}
