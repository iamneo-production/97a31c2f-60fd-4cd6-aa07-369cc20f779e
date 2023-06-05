import { store } from "../store"
import { baseUrl } from "./authService";

let token ="";
store.subscribe( () => {
  token = store.getState().auth.token;
  console.log(token)
});

export const getReviews = async () => {
  try {
    const response = await fetch(`${baseUrl}/user/getAllFeedback`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
