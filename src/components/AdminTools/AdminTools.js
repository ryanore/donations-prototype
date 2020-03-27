import React, { useState } from 'react'
import { useDonations, PROJECT_UPDATE } from '../../context/donations-context'
import './AdminTools.scss'

const AdminTools = () => {
  const { donationsDispatch } = useDonations()

  const handleSubmit = (e) => {
    e.preventDefault()
    donationsDispatch({
      type: PROJECT_UPDATE,
    })
  }

  return (
    <div className="adminTools">
      <form onSubmit={handleSubmit}>
        <span className="h2">Admin</span>
        <p>Resetting the project will set it back to zero.</p>
        <button type="submit" className="btn-reset">
          Reset Project
        </button>
      </form>
    </div>
  )
}

export default AdminTools
