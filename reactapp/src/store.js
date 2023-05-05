import { createStore } from 'redux'

const initialState = { auth:{token: "",role:"",email:"",id:""} }

// Define the reducer function that updates the store's state based on dispatched actions
const counterReducer = (state = initialState , action) => {

  switch (action.type) {

    // If the dispatched action has a type of 'LOGIN', update the auth object in the state with the payload data
    case 'LOGIN':
      const format = { token: action.payload.token,role:action.payload.roles,email:action.payload.email,id:action.payload.id }
      return { ...state, auth: format }

    // If the dispatched action has a type of 'LOGOUT', return the initial state object
    case 'LOGOUT':
      return initialState

    // If the dispatched action doesn't match any of the defined cases, return the current state object
    default: 
      return state
  }
}

const store = createStore(counterReducer)
export { store }