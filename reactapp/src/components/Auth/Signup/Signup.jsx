import React, { useState } from "react";
import authService from "../../../api/authService";
import { Link, Navigate } from "react-router-dom";
import Validation from "../../Auth/Signup/Validation";
import "./Signup.css"; 

const Signup = () => {
  const initialState = {
    form: {
      email: "",
      mobileNumber: "",
      password: "",
      username: "",
      userType: "USER",
      confirmPassword: "",
    },
    errors: {
      hasError: false,
      email: { required: false, message: "" },
      password: { required: false, message: "" },
      username: { required: false, message: "" },
      mobileNumber: { required: false, message: "" },
      confirmPassword: { required: false, message: "" },
      custom: { required: false, message: "" },
    },
  };

  // Setting initial state using hooks
  const [formData, setFormData] = useState(initialState.form);
  const [errors, setErrors] = useState(initialState.errors);
  const [loader, setLoader] = useState(false);
  const [redirect, setRedirect] = useState(false);

  // Event handler for input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorObj = initialState.errors;
    // Validating form data
    errorObj = Validation(formData, errorObj);
    setErrors(errorObj);
    // If there are no errors, submit the form
    if (!errorObj.hasError) {
      setLoader(true);
      authService
        .register(formData)
        .then((data) => {
          if (data.id) {
            console.log("success registered");
            setRedirect(true);
            setLoader(false);
          } else {
            errorObj.custom.required = true;
            errorObj.custom.message = data.message;
            setLoader(false);
          }
        })
        .catch((error) => {
          console.error("Error registering:", error);
          setLoader(false);
        });
    }
  };

  return (
    <section className="whole2">
      <div className="flex flex-col ml-6 md:ml-20 px-2 md:px-6 py-4 md:py-8 lg:pt-0 lg:pb-4">
        <div className="flex mx-auto items-center mb-4 text-3xl md:text-4xl font-semibold text-white shadow md:mt-2 md:font-bold md:mt-4">
          PG Admission 
        </div>
        <div
          data-testid="signupBox"
          className="w-full bg-transparent border border-solid  rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0"
        >
          <div className="p-4 md:p-6 space-y-2 md:space-y-4">
          <h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight text-white">
              Sign up to your account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
              <div>
                <label
                  htmlFor="userType"
                  className="block mb-1 text-sm font-medium text-white"
                >
                  User Type:
                </label>
                <select
                  data-testid="userType"
                  name="userType"
                  value={formData.userRole}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>  

              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-white"
                >
                  Your email:
                </label>
                <input
                  type="email"
                  data-testid="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="virtusa@gmail.com"
                />
                {errors.email.required && (
                  <div className="text-red-500">{errors.email.message}</div>
                )}
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block mb-1 text-sm font-medium text-white"
                >
                  Username:
                </label>
                <input
                  type="text"
                  data-testid="username"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Virtusa"
                />
                {errors.username.required && (
                  <div className="text-red-500">{errors.username.message}</div>
                )}
              </div>

              <div>
                <label
                  htmlFor="mobileNumber"
                  className="block mb-1 text-sm font-medium text-white"
                >
                  Mobile Number:
                </label>
                <input
                  type="text"
                  data-testid="mobileNumber"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="9710838457"
                />
                {errors.mobileNumber.required && (
                  <div className="text-red-500">
                    {errors.mobileNumber.message}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-white"
                >
                  Password:
                </label>
                <input
                  type="password"
                  data-testid="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                />
                {errors.password.required && (
                  <div className="text-red-500">{errors.password.message}</div>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-1 text-sm font-medium text-white"
                >
                  Confirm Password:
                </label>
                <input
                  type="password"
                  data-testid="confirmPassword"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                />
                {errors.confirmPassword.required && (
                  <div className="text-red-500">
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>

              <button
                type="submit"
                data-testid="submitButton"
                id="submitButton"
                // onClick={() => setTimeout(() => {navigate("/login")}, 2000)}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign up
              </button>
              {loader && <div className="loader mr-auto ml-auto"></div>}
              {errors.custom.required && (
                <div className="text-red-500">{errors.custom.message}</div>
              )}

              <p className="block mb-1 text-sm font-medium text-white">
                Already a user?{" "}
                <Link
                  to="/login"
                  className="text-blue-800 font-semibold"
                  data-testid="signinLink"
                >
                  Sign in
                </Link>
              </p>
              {redirect && <Navigate to="/login" />}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
