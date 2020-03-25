import React from 'react'
// import PropTypes from 'prop-types'
import { useDonationsState } from '../../context/donations-context'

const propTypes = {}
const defaultProps = {}

const InfoBubble = () => {
  const { remaining } = useDonationsState()
  return <div data-testid="info">still needed {remaining} to fund this project.</div>
}

InfoBubble.propTypes = propTypes
InfoBubble.defaultProps = defaultProps

export default InfoBubble
