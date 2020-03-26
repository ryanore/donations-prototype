import React from 'react'
import PropTypes from 'prop-types'
import './InfoBubble.scss'

const ProgressCarat = ({ percent = 0 }) => {
  const stylesheet = {
    left: `${percent}%`,
    display: percent >= 100 ? 'none' : 'block',
  }
  return (
    <div className="progressCarat-container">
      <div style={stylesheet} className="progressCarat"></div>
    </div>
  )
}

ProgressCarat.propTypes = { percent: PropTypes.number }
ProgressCarat.defaultProps = { percent: 0 }

export default ProgressCarat
