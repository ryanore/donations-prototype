import React from 'react'
import { useDonations } from '../../context/donations-context'
import { toCurrency } from '../../utils/number'
const InfoBubble = () => {
  const { donationsState } = useDonations()
  const { remaining } = donationsState
  const dollars = toCurrency(remaining, true)

  return (
    <div data-testid="info">{dollars} still needed to fund this project.</div>
  )
}

export default InfoBubble
