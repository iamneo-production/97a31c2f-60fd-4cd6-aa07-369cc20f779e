import { store } from "../store"
import { baseUrl } from "./authService";

let token =""
store.subscribe( () => {
  token = store.getState().auth.token;
  console.log(token)
});

export const studentDetails = async () => {
    try {
      const response = await fetch(`${baseUrl}/user/viewAdmission`,{
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
  

  const CourseService = {studentDetails};
  export default CourseService;