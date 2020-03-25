This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Criteria

Create a prototype of a form for an upcoming donation drive.

- Goal is \$5k
- Form should adhere to the design
- Form should not accept donations of less than \$5 USD
- With each donation update the remaining donation dollars needed to reach the goal, the progress bar, and the number of donors Details
- use Poppins and IBM Flex fonts (google)
- Use a CSS preprocessor, like Sass
- Add the ability to reset the form
- Cache state across refreshes
- Add active, hover, focus, success, warning, or error states to those elements where it makes sense
- Enhance the form at important stages of funding progress

## State

The state will live in a reducer `AppReducer`
Possibly use context, but i think prop-drilling will suffice for this small component

The following values will be in the state tree:

`goal` - number

- floating point \$xxxx.00
- needs formatting util for adding zeros when needed

`gained` - number

- increment value, then compute the remaining number for display

`progress` - number

- Stored v.s computed

`donors` - number

- just an incrementing number but could be objects later

`message` - object

- A global message for computed value of the info bubble???

`over` - number

- Numbe we are over our goal

## Steps

1. set up the reducer,

- basic actions
- state tree with defaults

2. UI components

- make it functional - dispatch actions, update state
- make it validate
- make it pretty

3. Refactor to use context

4. Bonuses

- Reset the form - some kind of ui that allows reset state tree
- LocalStorage
- UI states (active/hover/success/warning)
- Accessibility
- Unit tests
