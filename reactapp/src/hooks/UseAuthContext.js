import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// Defining a custom hook named "UseAuthContext"
export const UseAuthContext = () => {
  
  // Calling "useContext" hook and passing the "AuthContext" as a parameter to get the current context value
  const context = useContext(AuthContext)

  // If there is no context value found then throw an error message
  if (!context) {
    throw Error("UseAuthContext must be used inside an AuthcontextProvider ")
  }

  // Return the context value that contains user data and dispatch method
  return context
}
