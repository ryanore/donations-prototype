import React from 'react'
// import PropTypes from 'prop-types'
import { useDonationsState } from '../../context/donations-context'

const propTypes = {}
const defaultProps = {}

const DonationWidget = () => {
  const { goal } = useDonationsState()

  return <div data-testid="widget">Goal is {goal}</div>
}

DonationWidget.propTypes = propTypes
DonationWidget.defaultProps = defaultProps

export default DonationWidget
