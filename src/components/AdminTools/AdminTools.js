import React, { useState } from 'react'
import { useDonations, PROJECT_UPDATE } from '../../context/donations-context'
import './AdminTools.scss'

const AdminTools = () => {
  const [goal, setGoal] = useState(5000)
  const [projectName, setProjectName] = useState('')
  const { donationsDispatch } = useDonations()

  const handleSubmit = (e) => {
    e.preventDefault()
    donationsDispatch({
      type: PROJECT_UPDATE,
      payload: {
        projectName,
        goal: parseFloat(goal, 10),
      },
    })
    setProjectName('')
    setGoal(0)
  }

  return (
    <div className="adminTools">
      <form onSubmit={handleSubmit}>
        <span className="h2">Admin</span>
        <p>
          You can clear this project and start with a new goal and project name.
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
        <button type="submit" className="btn-reset">
          Reset Project
        </button>
      </form>
    </div>
  )
}

export default AdminTools
