import React, { createContext, useContext, useReducer, useEffect } from 'react'

const DonationsState = createContext()
const DonationsDispatch = createContext()
const DONATION_SUBMIT = 'DONATION_SUBMIT'
const PROJECT_RESET = 'PROJECT_RESET'
const PROJECT_UPDATE = 'PROJECT_UPDATE'
const LS_NAMESPACE = 'ac-donations'

export const defaultState = {
  goal: 5000,
  gained: 0,
  progress: 0,
  donors: 0,
  remaining: 5000,
  minDonation: 5,
  over: 0,
}

/**
 * Helper to compute new state on each new donation
 */
function handleNewDonation(amt, state) {
  const gained = parseFloat(state.gained, 10) + parseFloat(amt, 10)
  const progress = Math.floor(100 * (gained / parseFloat(state.goal, 10)))
  const over = Math.max(gained - parseFloat(state.goal, 10), 0)
  return {
    gained,
    progress,
    over,
    donors: state.donors + 1,
    remaining: state.goal - gained,
  }
}

/**
 * Helper for reseting the project
 * Probably want to update the projectName so we can use for other projects,
 * but it's not in the design
 */
function handleProjectReset(data) {
  const { projectName, goal } = data
  const newGoal = parseFloat(goal, 10)
  return {
    projectName,
    gained: 0,
    remaining: newGoal,
    goal: newGoal,
  }
}

/**
 * Reducer function for app state
 */
function donationsReducer(state, action) {
  switch (action.type) {
    case DONATION_SUBMIT:
      return Object.assign({}, state, handleNewDonation(action.payload, state))
    case PROJECT_UPDATE:
      return Object.assign({}, defaultState, handleProjectReset(action.payload))
    default:
      return state
  }
}

/**
 * Provider component for wraping children with Donations context
 * - get and set data in localstorage
 */
function DonationsProvider({ children, value }) {
  const initialValue = Object.assign({}, defaultState, value)

  const [state, dispatch] = useReducer(donationsReducer, initialValue, () => {
    const cache = localStorage.getItem(LS_NAMESPACE)
    try {
      return cache ? JSON.parse(cache) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(LS_NAMESPACE, JSON.stringify(state))
  }, [state])

  return (
    <DonationsState.Provider value={state}>
      <DonationsDispatch.Provider value={dispatch}>
        {children}
      </DonationsDispatch.Provider>
    </DonationsState.Provider>
  )
}

/**
 * Custom Hook for accessing dispatch and state
 */
function useDonations() {
  return {
    donationsState: useContext(DonationsState),
    donationsDispatch: useContext(DonationsDispatch),
  }
}

export {
  DonationsProvider,
  useDonations,
  DONATION_SUBMIT,
  PROJECT_RESET,
  PROJECT_UPDATE,
}
