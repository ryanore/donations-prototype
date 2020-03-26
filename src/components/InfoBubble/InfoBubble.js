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
      <div className="infoBubble-content">
        <ProgressCarat percent={progress} />

        {gained === goal && (
          <span>
            This project met its goal of{' '}
            <strong>{toCurrency(goal, true)}</strong>!
          </span>
        )}
        {gained > goal && (
          <span>
            This project exceeded its goal by{' '}
            <strong>{toCurrency(gained - goal, true)}</strong>!
          </span>
        )}
        {gained < goal && (
          <span>
            <strong>{toCurrency(goal - gained, true)}</strong> still needed to
            fund this project.
          </span>
        )}
      </div>
    </div>
  )
}

export default InfoBubble
