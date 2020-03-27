import React, { useState, useEffect } from 'react'
import { useDonations, PROJECT_UPDATE } from '../../context/donations-context'
import './AdminTools.scss'

const AdminTools = ({ isAdmin }) => {
  const [valid, setValid] = useState()
  const [error, setError] = useState(false)
  const [open, setOpen] = useState(false)
  const [goal, setGoal] = useState('')
  const [minDonation, setMinDonation] = useState('')
  const [projectName, setProjectName] = useState('')
  const { donationsDispatch } = useDonations()

  useEffect(() => {
    const valid = goal > 0 && minDonation > 0 && projectName.length > 0
    setValid(valid)
  }, [minDonation, projectName, goal])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (valid) {
      console.log('goal ', goal)

      donationsDispatch({
        type: PROJECT_UPDATE,
        payload: {
          projectName,
          minDonation,
          goal: parseFloat(goal, 10),
        },
      })
      setError(false)
      setProjectName('')
      setGoal('')
      setMinDonation('')
    } else {
      setError(true)
    }
  }

  if (!open && isAdmin) {
    return (
      <span className="link" onClick={() => setOpen(true)}>
        Open admin panel
      </span>
    )
  }

  if (open && isAdmin) {
    return (
      <div className="adminTools">
        <span className="closeLink link" onClick={() => setOpen(false)}>
          X
        </span>
        <form onSubmit={handleSubmit}>
          <span className="h2">Edit the Project</span>
          <p>
            You can clear this project and start with a new goal and project
            name.
          </p>
          <div className="form-group">
            <label htmlFor="newGoal">Project Goal</label>
            <input
              type="number"
              min="1"
              name="newGoal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="projectName">Project Name</label>
            <input
              name="projectName"
              value={projectName}
              placeholder="e.g. The Good Foundation"
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="minDonation">Minimum Donation</label>
            <input
              type="number"
              min="1"
              name="minDonation"
              value={minDonation}
              onChange={(e) => setMinDonation(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-reset">
            Reset Project
          </button>
        </form>
        {error && <span className="error">Please fill out all fields.</span>}
      </div>
    )
  }

  return null
}

export default AdminTools
