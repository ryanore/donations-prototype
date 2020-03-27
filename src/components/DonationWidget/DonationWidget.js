import React from 'react'
import ProgressBar from '../ProgressBar'
import DonationForm from '../DonationForm'
import { useDonations, CONFIRM_SUBMIT } from '../../context/donations-context'
import './DonationWidget.scss'

const IntroCopy = ({ donors, progress }) => {
  if (donors >= 1) {
    return (
      <p>
        {progress >= 51 && progress < 100 && (
          <span>We're more than halfway there! </span>
        )}
        Join the <strong>{donors}</strong> other donors who have already
        supported this project.{' '}
      </p>
    )
  } else {
    return <p>Be the first donor to support this project!</p>
  }
}

const ThankYouCopy = ({ projectName, handleClick }) => {
  return (
    <div>
      <p>
        Thank you
        {projectName && (
          <span>
            , on behalf of <strong>{projectName}</strong>
          </span>
        )}
        <br />
        <br />
        <button onClick={handleClick} className="primary">
          Woohoo!
        </button>
      </p>
    </div>
  )
}

const DonationWidget = () => {
  const { donationsState, donationsDispatch } = useDonations()
  const { donors, progress, projectName, submitted } = donationsState

  const handleClick = () => donationsDispatch({ type: CONFIRM_SUBMIT })

  return (
    <div data-testid="widget" className="donationWidget">
      <ProgressBar percent={progress} />
      <span className="h1">
        Only four days left to fund <strong>{projectName}</strong>.
      </span>

      {!submitted && (
        <div>
          <IntroCopy donors={donors} progress={progress} />
          <DonationForm />
        </div>
      )}

      {submitted && (
        <ThankYouCopy projectName={projectName} handleClick={handleClick} />
      )}
    </div>
  )
}

export default DonationWidget
