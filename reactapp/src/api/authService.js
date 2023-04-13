const baseUrl = "https://8080-deacebeebcbbfafccddecaeebaeccc.project.examly.io";

const register = async (data) => { 
    const formatData = {
        email: data.email,
        password: data.password,
        userRole: data.userType,
        username: data.username,
        mobileNumber: data.mobileNumber,
    } 
    console.log(formatData);
    if (formatData.userRole === "admin")
        return fetch(`${baseUrl}/admin/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    else
        return fetch(`${baseUrl}/user/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
};

const myHeaders = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://8080-deacebeebfccecfccdceceefcbafdfb.examlyiopb.examly.io/',
    'Access-Control-Allow-Methods' : 'OPTIONS, DELETE, POST, GET, PATCH, PUT'
  });

let login = async (data) => {
      let res = await fetch(`${baseUrl}/user/login`, {
        headers: myHeaders,
        method: "POST",
        body: JSON.stringify({      
         email: data.email,
         password: data.password,
        }),
      });
      if (!res.ok) {
        const message = `An error has occured: ${res.status}`;
        throw new Error(message);
      }
      let resJson = await res.json();
      console.log(res.status);
      return res;
    }


  

// const login = async (data) => { 
//     let response = await fetch(`${baseUrl}/user/login`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     });
//     console.log(response)
//     return response.json();
// }

export default { register, login };