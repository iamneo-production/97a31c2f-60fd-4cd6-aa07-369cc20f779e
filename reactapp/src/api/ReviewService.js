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
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteReviews = async (id) => {
  try {
    console.log(`${baseUrl}/admin/deleteFeedback/${id}`)
    const response = await fetch(`${baseUrl}/admin/deleteFeedback/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error(error);
  }
};
