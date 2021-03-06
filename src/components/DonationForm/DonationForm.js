import React, { useState, useEffect } from 'react'
import './DonationForm.scss'
import { useDonations, DONATION_SUBMIT } from '../../context/donations-context'

const DonationForm = () => {
  const { donationsState, donationsDispatch } = useDonations()
  const { minDonation } = donationsState
  const [value, setValue] = useState(minDonation)
  const [valid, setValid] = useState(value >= minDonation)

  const handleChange = (e) => {
    setValue(e.target.value)
    setValid(e.target.value >= minDonation)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    donationsDispatch({
      type: DONATION_SUBMIT,
      payload: value,
    })
  }

  useEffect(() => {
    setValue(minDonation)
  }, [minDonation])

  return (
    <form
      onSubmit={handleSubmit}
      className="donationForm"
      data-testid="donationForm"
    >
      <div className="form-group">
        <input
          title="donation"
          type="number"
          onChange={handleChange}
          value={value}
        />
        <button type="submit" disabled={!valid}>
          Give Now
        </button>
      </div>

      {!valid && (
        <span role="alert" className="error">
          ${minDonation} minimum please
        </span>
      )}
    </form>
  )
}

export default DonationForm
