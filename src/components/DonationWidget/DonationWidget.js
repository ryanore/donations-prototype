import React, { useState } from 'react'
import {
  useDonationsState,
  useDonationsDispatch,
  DONATION_SUBMIT,
} from '../../context/donations-context'

const DonationWidget = () => {
  const { goal, donors, minDonation } = useDonationsState()
  const dispatch = useDonationsDispatch()
  const [value, setValue] = useState(5)
  const [valid, setValid] = useState(value >= 5)

  const handleChange = (e) => {
    setValue(e.target.value)
    setValid(e.target.value >= 5)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({
      type: DONATION_SUBMIT,
      payload: value,
    })
  }

  return (
    <div>
      <h1>Only four days left to fund this project</h1>

      {donors >= 1 ? (
        <p>Join the {donors} other donors who have already supported this project.</p>
      ) : (
        <p>Be the first donor to support this project!</p>
      )}

      <form onSubmit={handleSubmit}>
        <input type="number" onChange={handleChange} value={value} />
        <button disabled={!valid}>Give Now</button>

        {!valid && <p className="warning">${minDonation} minimum please</p>}
      </form>
    </div>
  )
}

export default DonationWidget
