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
      <h1>Only four days left to fund this project</h1>
      {donors >= 1 ? (
        <p>
          Join the {donors} other donors who have already supported this
          project.
        </p>
      ) : (
        <p>Be the first donor to support this project!</p>
      )}
      <DonationForm />
    </div>
  )
}

export default DonationWidget
