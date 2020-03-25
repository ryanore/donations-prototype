import React, { createContext, useContext, useReducer, useEffect } from 'react'

const DonationsState = createContext()
const DonationsDispatch = createContext()
const DONATION_SUBMIT = 'DONATION_SUBMIT'
const FORM_RESET = 'FORM_RESET'
const LS_NAMESPACE = 'ac-donations'
const defaultState = {
  goal: 5000,
  gained: 0,
  progress: 0,
  donors: 0,
  remaining: 5000,
  minDonation: 5,
  over: 0,
}

/**
 * Compute new state on each new donation
 */
function handleNewDonation(amt, state) {
  const gained = parseInt(state.gained, 10) + parseInt(amt, 10)
  const progress = 100 * (gained / parseInt(state.goal, 10))
  const over = Math.max(gained - parseInt(state.goal, 10), 0)
  return {
    gained,
    progress,
    over,
    donors: state.donors + 1,
    remaining: state.goal - gained,
  }
}

/**
 * Reducer function for app state
 */
function donationsReducer(state, action) {
  switch (action.type) {
    case DONATION_SUBMIT:
      return Object.assign({}, state, handleNewDonation(action.payload, state))
    case FORM_RESET:
      return Object.assign(defaultState)
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
      return cache ? JSON.parse(cache) : defaultState
    } catch (error) {
      return defaultState
    }
  })

  useEffect(() => {
    localStorage.setItem(LS_NAMESPACE, JSON.stringify(value))
  }, [value])

  return (
    <DonationsState.Provider value={state}>
      <DonationsDispatch.Provider value={dispatch}>
        {children}
      </DonationsDispatch.Provider>
    </DonationsState.Provider>
  )
}

/**
 * Custom hook which provides the reducer's state value
 */
function useDonationsState() {
  const context = useContext(DonationsState)
  if (context === undefined) {
    throw new Error('useDonationsState must be used within a DonationsProvider')
  }
  return context
}

/**
 * Custom hook provides `dispatch` for components
 */
function useDonationsDispatch() {
  const context = useContext(DonationsDispatch)
  if (context === undefined) {
    throw new Error(
      'useDonationsDispatch must be used within a DonationsProvider'
    )
  }
  return context
}

export {
  DonationsProvider,
  useDonationsState,
  useDonationsDispatch,
  DONATION_SUBMIT,
  FORM_RESET,
}
