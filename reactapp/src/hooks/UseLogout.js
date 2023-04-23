import { UseAuthContext } from "./UseAuthContext";

export const UseLogout = () => {
    const { dispatch } = UseAuthContext()

    const logout = () => {
        // remove user from local storage
        localStorage.removeItem("token")

        // dispatch logout to remove from state
        dispatch({type:"Logout"})
    }

    return {logout}
}