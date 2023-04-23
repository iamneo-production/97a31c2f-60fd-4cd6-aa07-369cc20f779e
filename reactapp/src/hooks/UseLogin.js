import { useState } from "react";
import { UseAuthContext } from "./UseAuthContext";
import authService from "../api/authService";

export const UseLogin = () => {
    const [customError, SetCustomError] = useState(null)
    const [loader, setLoader] = useState(false)
    const { dispatch } = UseAuthContext()
    
    const login =  (state) => {
        setLoader(true)
        SetCustomError(null)

         authService.login(state)
            .then((data) => {
                if (data.status === 200) {
                    //  save the token in local storage
                    localStorage.setItem("token", JSON.stringify(data.token))
                    
                    // update the auth context
                    dispatch({ type: 'Login', payload: data })
                    setLoader(false)
                }
                else {
                    setLoader(false)
                    SetCustomError(data.message)
                }
                            })
    }
    return {login,loader,customError}
}