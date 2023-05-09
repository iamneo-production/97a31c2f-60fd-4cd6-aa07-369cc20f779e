import { store } from "../store"
const baseUrl = "https://8080-efdecffbbebcbbfafccddecaeebaeccc.project.examly.io";
let token =""
store.subscribe( () => {
  token = store.getState().auth.token;
  console.log(token)
});

export const studentDetails = async () => {
    try {
      const response = await fetch(`${baseUrl}/admin/viewStudent`,{
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
  

  const CourseService = {studentDetails};
  export default CourseService;