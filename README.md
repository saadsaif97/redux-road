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

The store object returned by createStore() provides a number of useful methods for interacting with its state as well as the reducer function it was created with.

The most commonly used method, store.dispatch(), can be used to dispatch an action to the store, indicating that you wish to update the state. Its only argument is an action object, which must have a type property describing the desired state change.
```
const action = { type: 'actionDescriptor' }; 
store.dispatch(action);
```
Each time store.dispatch() is called with an action object, the store’s reducer function will be executed with the same action object. Assuming that the action.type is recognized by the reducer, the state will be updated and returned.

Let’s see how this works in the lightswitch application from the last exercise:
```
import { createStore } from 'redux';
 
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
 
console.log(store.getState()); // Prints 'on'
 
store.dispatch({ type: 'toggle' }); 
console.log(store.getState()); // Prints 'off'
 
store.dispatch({ type: 'toggle' });
console.log(store.getState()); // Prints 'on'
```

In this example, you can also see another store method, store.getState(), which returns the current value of the store’s state. Printing its value between each dispatched action allows us to see how the store’s state changes.

Internally, when the store executes its reducer, it uses store.getState() as the state argument. Though you won’t see it, you can imagine that, when an action is dispatched like this…
```
store.dispatch({ type: 'toggle'});
```
…the store calls the reducer like this:
```
lightSwitchReducer(store.getState(), { type: 'toggle' });
```

### Respond to changes
In a typical web application, user interactions that trigger DOM events ("click", "keydown", etc…) can be listened for and responded to using an event listener.

Similarly, in Redux, actions dispatched to the store can be listened for and responded to using the store.subscribe() method. This method accepts one argument: a function, often called a listener, that is executed in response to changes to the store‘s state.

```
const reactToChange = () => console.log('change detected!');
store.subscribe(reactToChange);
```
In this example, each time an action is dispatched to the store, and a change to the state occurs, the subscribed listener, reactToChange(), will be executed.

Sometimes it is useful to stop the listener from responding to changes to the store, so store.subscribe() returns an unsubscribe function.

We can see this in action in the light switch application:
```
// lightSwitchReducer(), toggle(), and store omitted...
 
const reactToChange = () => {
  console.log(`The light was switched ${store.getState()}!`);
}
const unsubscribe = store.subscribe(reactToChange);
 
store.dispatch(toggle());
// reactToChange() is called, printing:
// 'The light was switched off!'
 
store.dispatch(toggle());
// reactToChange() is called, printing:
// 'The light was switched on!'
 
unsubscribe(); 
// reactToChange() is now unsubscribed
 
store.dispatch(toggle());
// no print statement!
 
console.log(store.getState()); // Prints 'off'
```
In this example, the listener function reactToChange() is subscribed to the store
Each time an action is dispatched, reactToChange() is called and prints the current value of the light switch. It is common for callbacks subscribed to the store to use store.getState() inside them.
After the first two dispatched actions, unsubscribe() is called causing reactToChange() to no longer be exectued in response to further dispatches made to store.
Note: It is not always required to use the unsubscribe() function returned by store.subscribe(), though it is useful to know that it exists.

Now, take a look at store.js in the code editor. You will see that a few actions have been dispatched to the store of the counter application. Suppose you wanted to print the current value of store.getState() each time the state changes. While you could write something like this…
```
store.dispatch(decrement());
console.log(`The count is ${store.getState()}`);
store.dispatch(increment());
console.log(`The count is ${store.getState()}`);
store.dispatch(increment());
console.log(`The count is ${store.getState()}`);
```
…we know that this approach is repetitive. Instead, you can subscribe a change listener to print out the current state in response to state changes automatically.
