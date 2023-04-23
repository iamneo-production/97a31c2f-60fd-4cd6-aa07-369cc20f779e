import { createContext, useEffect, useReducer, useMemo } from "react";
import authService from "../api/authService";


export const AuthContext = createContext();


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

export const AuthContextProvider = ({ children }) => {

const [state, dispatch] = useReducer(authReducer, { user: null });


useEffect(() => {
const token = JSON.parse(localStorage.getItem('token'));
if (token) {
authService.tokenDetails(token)
.then((data) => {
if (data.status === 200) {

dispatch({ type: 'Login', payload: data });
} else {
console.log('Error when loading user details.');
}
});
}
}, []);

console.log('AuthContext state:', state);


const value = useMemo(() => ({ ...state, dispatch }), [state]);


return (
<AuthContext.Provider value={value}>
{children}
</AuthContext.Provider>
);
};