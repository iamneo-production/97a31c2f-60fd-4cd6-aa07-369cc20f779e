import { store } from "../store"
const baseUrl="https://8080-efdecffbbebcbbfafccddecaeebaeccc.project.examly.io";
let token=""
store.subscribe(()=>{
    token=store.getState().auth.token;
    console.log(token);
});
 export const Updatestudent=async(studentIdNumber,updatedData)=>{
    try{
        const response=await fetch(`${baseUrl}/user/viewStudentsfrom`,{
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
              body:JSON.stringify(updatedData),
        });
        return await response.json();
        
      } catch (error) {
        console.error(error);
      }
    };
    
  
    const Studentservice = {Updatestudent};
    export default Studentservice;
    
 
