# redux-road
learnt the core redux concept building game

This was the project on codecademy with clear directions, I followed the directions and instructions and build it.

In this project I built an adventure game using reducers, state, and actions. The state represented, well, the state of the game. It contains the player’s inventory, distance travelled, and time on the road. Each event in the game is represented as an action. Players can gather supplies, travel, and–if they play risky–sometimes tip over the wagon carrying their supplies.

#### rules for reducers:
* They should only calculate the new state value based on the state and action arguments.
* They are not allowed to modify the existing state. Rather they should return new state.
* They must not do any asynchronous logic or other “side effects”.

in redux, one way data flow is as:
#### Store → View → Actions → Store

a simple example of immutable state update is as:
```
const initialState = {
   isLate: false,
   ETA: '11:00',
   destination: 'Mars'
};
 
const arrivalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setToLate': {
      return {
        ...state, 
        isLate: true
      };
    }
    default:
      return state;
  }
}
```




## Redux notes

As you know, every Redux application uses a reducer function that describes which actions can update the state and how those actions lead to the next state.

For example, suppose you wanted to build an application for a light switch. Its reducer might look like this:
```
const initialState = 'on';
const lightSwitchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'toggle':
      return state === 'on' ? 'off' : 'on';
    default:
      return state;
  }
}
```
This reducer handles a single action type 'toggle' and returns the next state of the store: 'on' if it had been 'off' and vice-versa. If an unrecognized action is received, the current state of the store is returned.

The programmer could manually execute the reducer with the current state of the store and the desired action to perform like so:
```
let state = 'on';
state = lightSwitchReducer(state, { type: 'toggle' });
console.log(state); // Prints 'off'
```
However, this is the main responsibility of the store. The store is an object that enforces the one-way data flow model that Redux is built upon. It holds the current state inside, receives action dispatches, executes the reducer to get the next state, and provides access to the current state for the UI to re-render.

Redux exports a valuable helper function for creating this store object called createStore(). The createStore() helper function has a single argument, a reducer function.

To create a store with lightSwitchReducer, you could write:
```
import { createStore } from 'redux'
 
const initialState = 'on';
const lightSwitchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'toggle':
      return state === 'on' ? 'off' : 'on';
    default:
      return state;
  }
}
 
const store = createStore(lightSwitchReducer);
```





