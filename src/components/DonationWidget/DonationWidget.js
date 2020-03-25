import React from 'react'
import DonationForm from '../DonationForm'
import { useDonations } from '../../context/donations-context'

const DonationWidget = () => {
  const { donationsState } = useDonations()
  const { donors } = donationsState

  return (
    <div data-testid="widget">
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
