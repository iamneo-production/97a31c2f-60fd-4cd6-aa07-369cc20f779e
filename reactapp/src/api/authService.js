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
    if (formatData.userRole === "Admin") {
        const response = await fetch(`${baseUrl}/admin/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formatData),
        });
        return response.json();
    }
    else {
        const response = await fetch(`${baseUrl}/user/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }
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
