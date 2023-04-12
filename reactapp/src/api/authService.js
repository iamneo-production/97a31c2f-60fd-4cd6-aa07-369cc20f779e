const baseUrl = "https://8080-fcffeccfcdbefebcbbfafccddecaeebaeccc.project.examly.io";

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
}

const login = async (data) => { 
    const response = await fetch(`${baseUrl}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export default { register, login };
