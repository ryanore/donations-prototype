import React, { createContext, useContext, useReducer, useEffect } from 'react'
const DonationsState = createContext()
const DonationsDispatch = createContext()
const DONATION_SUBMIT = 'DONATION_SUBMIT'
const PROJECT_RESET = 'PROJECT_RESET'
const PROJECT_UPDATE = 'PROJECT_UPDATE'
const CONFIRM_SUBMIT = 'CONFIRM_SUBMIT'
const LS_NAMESPACE = 'ac-donations'

export const defaultState = {
  projectName: 'The Good Foundation',
  goal: 5000,
  gained: 0,
  minDonation: 5,
  donors: 0,
  progress: 0,
  submitted: false,
}

/**
 * Helper to compute new state on each new donation
 */
function handleNewDonation(amt, state) {
  const gained = parseFloat(state.gained, 10) + parseFloat(amt, 10)
  const progress = Math.floor(100 * (gained / parseFloat(state.goal, 10)))
  return {
    gained,
    progress,
    donors: state.donors + 1,
    submitted: true,
  }
}

/**
 * Helper for reseting the project
 */
function handleProjectReset(data) {
  const { projectName, goal, minDonation } = data
  return {
    minDonation: parseFloat(minDonation),
    goal: parseFloat(goal),
    projectName: projectName || 'The Project',
    gained: 0,
    submitted: false,
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
    case CONFIRM_SUBMIT:
      return Object.assign({}, state, { submitted: false })
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

  // pop out anything we don't want to persist, then put in ls
  useEffect(() => {
    const cache = Object.assign({}, state)
    delete cache.submitted
    localStorage.setItem(LS_NAMESPACE, JSON.stringify(cache))
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
  LS_NAMESPACE,
  DONATION_SUBMIT,
  PROJECT_RESET,
  PROJECT_UPDATE,
  CONFIRM_SUBMIT,
}
