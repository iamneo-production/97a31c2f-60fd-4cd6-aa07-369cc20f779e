import { store } from "../store"
import { baseUrl } from "./authService";

let token ="";
let role ="";
store.subscribe( () => {
  token = store.getState().auth.token;
  role = store.getState().auth.role;
  console.log(token)
});

export const addCourse = async (newCourse) => {
  console.log("Bearer -" + token)
  const response = await fetch(`${baseUrl}/admin/addCourse`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify(newCourse),
  });
  return response.json();
};

export const getCourses = async () => {
  console.log(`${baseUrl}/${role}/courses`);
  const newRole = role == "ADMIN" ? "admin":"user"
  try {
    const response = await fetch(`${baseUrl}/${newRole}/courses`, {
      method: "GET",
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
};
export const editCourse = async (id, updatedCourse) => {
  try {
    const response = await fetch(`${baseUrl}/admin/editCourse/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedCourse),
    });

    if (!response.ok) {
      throw new Error("Failed  to update course.");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(`Error updating course: ${error}`);
    throw error;
  }
};


export const deleteCourse = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/admin/deleteCourse/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to delete course with id ${id}`);
    }
    return "Course deleted";
  }
  catch (error) {
    console.error(error);
  }
};