import { store } from "../store"
import { baseUrl } from "./authService";
let token = ""
store.subscribe(() => {
  token = store.getState().auth.token;
  console.log(token);
});
export const getStudents = async () => {
  try {
    const response = await fetch(`${baseUrl}/user/viewAdmission`, {
      method: 'GET',
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
export const editstudent = async (id, updatestudent) => {
  try {
    const ress = await fetch(`${baseUrl}/user/editAdmission/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatestudent),
    });
    if (!ress.ok) {
      throw new Error("Failed to update student");
    }
    const data = await ress.json();
    return data;
  } catch (error) {
    console.error(`Error:${error}`);
    throw error;
  }
}
export const deletestud = async (id) => {
  try {
    const responses = await fetch(`${baseUrl}/user/deleteAdmission/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
    });
    if (!responses.ok) {
      throw new Error(`Failed to delete the student ${id}`);
    }
    return "Student Deleted";
  }
  catch (error) {
    console.error(error);
  }
}

// get students with pagination
export const getStudentsWithPagination = async (pageNo, pageSize) => { 
  try {
    const response = await fetch(`${baseUrl}/admin/viewAdmission?page=${pageNo}&pageSize=${pageSize}&sortBy=id`, {
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

const Studentservice = { getStudents,editstudent,deletestud, getStudentsWithPagination };
export default Studentservice;

