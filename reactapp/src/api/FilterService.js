import { store } from "../store"
import { baseUrl } from "./authService";
let token = ""
store.subscribe(() => {
  token = store.getState().auth.token;
  console.log(token);
});

export const getFilters = async (status) => { 
    try {
        console.log(`${baseUrl}/admin/filter/status?status=${status}`);
        const response = await fetch(`${baseUrl}/admin/filter/status?status=${status}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
 }