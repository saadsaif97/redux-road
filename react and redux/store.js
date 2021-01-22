import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

// REDUX CODE
///////////////////////////////////

const toggle = () => {
  return { type: 'toggle' }
}

const initialState = 'off'
const lightSwitchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'toggle':
      return state === 'on' ? 'off' : 'on'
    default:
      return state
  }
}

const store = createStore(lightSwitchReducer)

// REACT CODE
///////////////////////////////////

// Pass the store's current state as a prop to the LightSwitch component.
const render = () => {
  ReactDOM.render(
    <LightSwitch state={store.getState()} />,
    document.getElementById('root')
  )
}

render() // Execute once to render with the initial state.
store.subscribe(render) // Re-render in response to state changes.

// Receive the store's state as a prop.
function LightSwitch(props) {
  const state = props.state

  // Adjust the UI based on the store's current state.
  const bgColor = state === 'on' ? 'white' : 'black'
  const textColor = state === 'on' ? 'black' : 'white'

  // The click handler dispatches an action to the store.
  const handleLightSwitchClick = () => {
    store.dispatch(toggle())
  }

  return (
    <div style={{ background: bgColor, color: textColor }}>
      <button onClick={handleLightSwitchClick}>{state}</button>
    </div>
  )
}
