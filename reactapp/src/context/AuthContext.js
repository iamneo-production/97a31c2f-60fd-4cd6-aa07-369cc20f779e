import { createContext, useEffect, useReducer } from "react";
import authService from "../api/authService";

// Create a context for authentication information
export const AuthContext = createContext();

// Define a reducer function to handle changes to the authentication state
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'Login':
      return { user: action.payload };
    case 'Logout':
      return { user: null };
    default:
      return state;
  }
};

// Define a provider component for the authentication context
export const AuthContextProvider = ({ children }) => {
  // Use a reducer to manage the authentication state
  const [state, dispatch] = useReducer(authReducer, { user: null });

  // Check for a saved token on mount and set the user state accordingly
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));

    if (token) {
      authService.tokenDetails(token)
        .then((data) => {
          if (data.status === 200) {
            // If the token is valid, set the user state to the retrieved data
            dispatch({ type: 'Login', payload: data });
          } else {
            console.log('Error when loading user details.');
          }
        });
    }
  }, []);

  console.log('AuthContext state:', state);

  // Render the provider component with the current authentication state and dispatch function
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );


  
};