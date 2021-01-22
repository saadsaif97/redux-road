const { createStore } = require('redux')

const increment = () => {
  return { type: 'increment' }
}

const decrement = () => {
  return { type: 'decrement' }
}

const initialState = 0
const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    default:
      return state
  }
}

const store = createStore(countReducer)

// Define your change listener function here.
function printCountStatus() {
  console.log(`The count is ${store.getState()}`)
}

const unsubscribe = store.subscribe(printCountStatus)

store.dispatch(decrement()) // store.getState() === -1
store.dispatch(increment()) // store.getState() === 0
store.dispatch(increment()) // store.getState() === 1
