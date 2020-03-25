import React, { createContext, useContext, useReducer, useEffect } from 'react'

const DonationsState = createContext()
const DonationsDispatch = createContext()
const DONATION_SUBMITTED = 'DONATION_SUBMITTED'
const FORM_RESET = 'FORM_RESET'
const LS_NAMESPACE = 'ac-donations'

// TODO - temporary, should be getting from localstorage..
const initialState = {
  goal: 5000,
  gained: 0,
  progress: 0,
  donors: 0,
  remaining: 5000,
}

/**
 * Reducer function for app state
 *
 * @param   {Object}  state   current state of app
 * @param   {Object}  action  object describing updates
 *
 * @return  {Object}          new state of app
 */
function donationsReducer(state, action) {
  switch (action.type) {
    case DONATION_SUBMITTED:
      return Object.assign({}, state, { foo: 'fa' })
    case FORM_RESET:
      return Object.assign(initialState)
    default:
      return state
  }
}

/**
 * Provider component for wraping children with Donations context
 * - get and set data in localstorage
 *
 * @param   {Array}  children  Any nested children
 *
 * @return  {Component}            [return description]
 */
function DonationsProvider({ children, value }) {
  const [state, dispatch] = useReducer(donationsReducer, initialState, () => {
    const cache = localStorage.getItem(LS_NAMESPACE)
    try {
      return cache ? JSON.parse(cache) : initialState
    } catch (error) {
      return initialState
    }
  })

  useEffect(() => {
    localStorage.setItem(LS_NAMESPACE, JSON.stringify(value))
  }, [value])

  return (
    <DonationsState.Provider value={state}>
      <DonationsDispatch.Provider value={dispatch}>{children}</DonationsDispatch.Provider>
    </DonationsState.Provider>
  )
}

/**
 * Custom hook which provides the reducer's state value
 *  - if context is underfined it means they didn't use provider
 *
 * @return  {Object}  the state represented in context
 */
function useDonationsState() {
  const context = useContext(DonationsState)
  if (context === undefined) {
    throw new Error('useDonationsState must be used within a DonationsProvider')
  }
  return context
}

/**
 * Custom hook provides dispatch for reducer
 *
 * @return  {Object}  the state represented in context
 */
function useDonationsDispatch() {
  const context = useContext(DonationsDispatch)
  if (context === undefined) {
    throw new Error('useDonationsDispatch must be used within a DonationsProvider')
  }
  return context
}

export {
  initialState,
  DonationsProvider,
  useDonationsState,
  useDonationsDispatch,
  DONATION_SUBMITTED,
  FORM_RESET,
}
