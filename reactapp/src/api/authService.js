// Define the base URL for the API requests


export const baseUrl = "https://8080-fcffeccfcdbefebcbbfafccdddedcceaefeeadb.project.examly.io";




// Define a function to register a user
const register = async (data) => {
  // Format the user data
  const formatData = {
    email: data.email,
    password: data.password,
    userRole: data.userType,
    username: data.username,
    mobileNumber: data.mobileNumber,
  };
    console.log("formated Data",formatData);
  
  // Send a POST request to the appropriate endpoint based on user role
  if (formatData.userRole === "ADMIN") {
    const response = await fetch(`${baseUrl}/admin/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formatData),
    });
    return response.json(); // Return the response as a JSON object
  }
  else {
    const response = await fetch(`${baseUrl}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json(); // Return the response as a JSON object
  }
};

// Define a function to log in a user or admin 
const login = async (data) => {
  // Send a POST request to the login endpoint
  const response = await fetch(`${baseUrl}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json(); // Return the response as a JSON object
};


// Export the functions 
const authService = {register,login};
export default authService;