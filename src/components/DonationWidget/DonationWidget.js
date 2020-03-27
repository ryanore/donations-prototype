import React from 'react'
import ProgressBar from '../ProgressBar'
import DonationForm from '../DonationForm'
import { useDonations } from '../../context/donations-context'
import './DonationWidget.scss'

const DonationWidget = () => {
  const { donationsState } = useDonations()
  const { donors, progress } = donationsState
  return (
    <div data-testid="widget" className="donationWidget">
      <ProgressBar percent={progress} />
      <span className="h1">Only four days left to fund this project</span>
      <p>
        {progress > 50 && progress < 100 && (
          <span>We're more than halfway there! </span>
        )}
        {donors > 1 && (
          <span>
            Join the <strong>{donors}</strong> other donors who have already
            supported this project.
          </span>
        )}
        {donors === 1 && (
          <span>
            Join the <strong>{donors}</strong> other donor who has already
            supported this project.
          </span>
        )}
        {donors < 1 && <span>Be the first donor to support this project!</span>}
      </p>
      <DonationForm />
    </div>
  )
}

export default DonationWidget
