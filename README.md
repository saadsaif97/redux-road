# redux-road
learnt the core redux concept building game

This was the project on codecademy with clear directions, I followed the directions and instructions and build it.

In this project I built an adventure game using reducers, state, and actions. The state represented, well, the state of the game. It contains the player’s inventory, distance travelled, and time on the road. Each event in the game is represented as an action. Players can gather supplies, travel, and–if they play risky–sometimes tip over the wagon carrying their supplies.

#### rules for reducers:
* They should only calculate the new state value based on the state and action arguments.
* They are not allowed to modify the existing state. Rather they should return new state.
* They must not do any asynchronous logic or other “side effects”.

#### in redux, one way data flow is as:
Store → View → Actions → Store
