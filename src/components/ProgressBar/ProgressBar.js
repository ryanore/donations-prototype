import React from 'react'
import './ProgressBar.scss'

const ProgressBar = ({ percent = 0 }) => {
  const fillStyles = {
    width: `${percent}%`,
  }
  return (
    <div className="progressBar">
      <div style={fillStyles} className="progressBar-fill" />
    </div>
  )
}

export default ProgressBar
