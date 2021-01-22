// set initial state
const initialWagonState = {
  supplies: 100,
  distance: 0,
  days: 0,
  cash: 200,
}

// define the reducer
const reducer = (state = initialWagonState, action) => {
  switch (action.type) {
    case 'gather': {
      return {
        ...state,
        supplies: state.supplies + 15,
        days: state.days + 1,
      }
    }
    case 'travel': {
      let newSupplies = state.supplies - 20 * action.payload
      let newDistance = state.distance + 10 * action.payload
      let newDays = state.days + action.payload

      if (state.supplies <= 0) return state
      else if (newSupplies < 0) return state

      return {
        ...state,
        supplies: newSupplies,
        distance: newDistance,
        days: newDays,
      }
    }
    case 'tippedWagon': {
      return {
        ...state,
        supplies: state.supplies - 30,
        days: state.days + 1,
      }
    }
    case 'sell': {
      return {
        ...state,
        supplies: state.supplies - 20,
        cash: state.cash + 5,
      }
    }
    case 'buy': {
      return {
        ...state,
        supplies: state.supplies + 25,
        cash: state.cash - 15,
      }
    }
    case 'theft': {
      return {
        ...state,
        cash: 0,
      }
    }
    default: {
      return state
    }
  }
}

// defining actions
let actionTravel = {
  type: 'travel',
  payload: 1,
}

let actionGather = {
  type: 'gather',
}

let actionTippedWagon = {
  type: 'tippedWagon',
}

let actionTravelThreeDays = {
  type: 'travel',
  payload: 3,
}

let sellAction = {
  type: 'sell',
}

let buyAction = {
  type: 'buy',
}

let theftAction = {
  type: 'theft',
}

// playing game
let mystate = reducer(undefined, {})
// mystate = reducer(mystate, sellAction)
// mystate = reducer(mystate, buyAction)
mystate = reducer(mystate, theftAction)
// mystate = reducer(mystate, actionTravel)
// mystate = reducer(mystate, actionGather)
// mystate = reducer(mystate, actionTippedWagon)
// mystate = reducer(mystate, actionTravelThreeDays) //supplies = 5, cant travel more, return this state

// mystate = reducer(mystate, actionTravel)
// mystate = reducer(mystate, actionTravel)
// mystate = reducer(mystate, actionTravel)
// mystate = reducer(mystate, actionTravel)

console.log(mystate)
