import React from 'react'
import { GET_STOCK_PRICE_DATA_AGGREGATES } from '../utils/queries'
import { useQuery } from '@apollo/client'

const Stock = () => {
  const { loading, error, data } = useQuery(GET_STOCK_PRICE_DATA_AGGREGATES, {
    variables: { 
      input: {
        symbol: 'AAPL',
        date_from: '2021-10-01',
        date_to: '2021-10-05',
        limit: 10,
        sort: 'asc'
      }
     },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :{error}</p>

  return (
    <div>
      Stock
    </div>
  )
}

export default Stock