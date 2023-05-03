import React from "react";
import NavBar from "./Navbar/Navbar";
import { AdminGuard } from "../../AuthGuard/AdminGuard";

const Adminstudent = () => {
    return (
        <AdminGuard>
            <NavBar />
            <h1>In Admin Student Page</h1>
        </AdminGuard>
    );
}

export default Adminstudent;