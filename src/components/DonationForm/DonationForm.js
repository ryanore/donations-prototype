import React, { useState } from 'react'
import './DonationForm.scss'
import { useDonations, DONATION_SUBMIT } from '../../context/donations-context'

const DonationForm = () => {
  const { donationsState, donationsDispatch } = useDonations()
  const { minDonation } = donationsState
  const [value, setValue] = useState(minDonation)
  const [valid, setValid] = useState(value >= minDonation)

  const handleChange = (e) => {
    setValue(e.target.value)
    setValid(e.target.value >= 5)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    donationsDispatch({
      type: DONATION_SUBMIT,
      payload: value,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="content-section">
      <input
        title="donation"
        type="number"
        onChange={handleChange}
        value={value}
      />
      <button type="submit" disabled={!valid}>
        Give Now
      </button>

      {!valid && <p className="warning">${minDonation} minimum please</p>}
    </form>
  )
}

export default DonationForm
