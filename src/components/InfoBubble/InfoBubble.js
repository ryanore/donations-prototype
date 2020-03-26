import React from 'react'
import { useDonations } from '../../context/donations-context'
import { toCurrency } from '../../utils/number'
import './InfoBubble.scss'

const ProgressCarat = ({ percent = 0 }) => {
  const stylesheet = {
    left: `${percent}%`,
  }
  return <div style={stylesheet} className="progressCarat"></div>
}

const InfoBubble = () => {
  const { donationsState } = useDonations()
  const { remaining, progress } = donationsState
  const dollars = toCurrency(remaining, true)

  return (
    <div className="infoBubble" data-testid="info">
      <ProgressCarat percent={progress} />
      <span>{dollars} still needed to fund this project.</span>
    </div>
  )
}

export default InfoBubble
