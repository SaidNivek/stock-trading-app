import React from 'react'
import { AutoComplete } from '../components/AutoComplete'
import { StockList } from '../components/StockList'

function StockOverviewPage() {
  return (
    <div>This is the Stock Overview Page
      <AutoComplete />
      <StockList />
    </div>
  )
}

export default StockOverviewPage