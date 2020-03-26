import React from 'react'
import PropTypes from 'prop-types'
import './ProgressBar.scss'

const propTypes = { percent: PropTypes.number }
const defaultProps = { percent: 0 }

const ProgressBar = ({ percent }) => {
  const fillStyles = {
    width: `${percent}%`,
  }
  return (
    <div className="progressBar" role="progressbar">
      <div style={fillStyles} className="progressBar-fill" />
    </div>
  )
}

ProgressBar.propTypes = propTypes
ProgressBar.defaultProps = defaultProps
export default ProgressBar
