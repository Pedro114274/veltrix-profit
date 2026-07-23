type ExchangeRateResponse = {
  USDBRL: {
    bid: string
    create_date: string
  }
}

export type ExchangeRate = {
  value: number
  updatedAt: string
}

const API_URL =
  'https://economia.awesomeapi.com.br/json/last/USD-BRL'

export async function getDollarExchangeRate(): Promise<ExchangeRate> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Não foi possível buscar a cotação do dólar.')
  }

  const data: ExchangeRateResponse = await response.json()

  return {
    value: Number(data.USDBRL.bid),
    updatedAt: data.USDBRL.create_date,
  }
}