import React from 'react'
import { useDonations } from '../../context/donations-context'
import { toCurrency } from '../../utils/number'
import ProgressCarat from './ProgressCarat'
import './InfoBubble.scss'

const InfoBubble = () => {
  const { donationsState } = useDonations()
  const { gained, goal, progress } = donationsState

  return (
    <div className="infoBubble" data-testid="info">
      <ProgressCarat percent={progress} />

      {gained === goal && (
        <span>This project met its goal of {toCurrency(goal, true)}!</span>
      )}
      {gained > goal && (
        <span>
          This project exceeded its goal by {toCurrency(gained - goal, true)}!
        </span>
      )}
      {gained < goal && (
        <span>
          {toCurrency(goal - gained, true)} still needed to fund this project.
        </span>
      )}
    </div>
  )
}

export default InfoBubble
