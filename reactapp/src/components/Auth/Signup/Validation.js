const Validation = (formData, errors) => {
  if (formData.email === "") {
    errors = {
      ...errors,
      email: { required: true, message: "Email is required" },
    };
    errors.hasError = true;
  }
  if (formData.username.length < 3) {
    errors = {
      ...errors,
      username: {
        required: true,
        message: "Username must be at least 3 characters",
      },
    };
    errors.hasError = true;
  }
  if (formData.username === "") {
    errors = {
      ...errors,
      username: { required: true, message: "Username is required" },
    };
    errors.hasError = true;
  }
  if (formData.mobileNumber.length !== 10) {
    errors = {
      ...errors,
      mobileNumber: {
        required: true,
        message: "Mobile Number must be 10 digits",
      },
    };
    errors.hasError = true;
  }
  if (formData.mobileNumber === "") {
    errors = {
      ...errors,
      mobileNumber: { required: true, message: "Mobile Number is required" },
    };
    errors.hasError = true;
  }
  if (formData.password !== formData.confirmPassword) {
    errors = {
      ...errors,
      confirmPassword: {
        required: true,
        message: "Password and Confirm Password must be the same",
      },
    };
    errors.hasError = true;
  }
  if (formData.password.length < 6) {
    errors = {
      ...errors,
      password: {
        required: true,
        message: "Password must be at least 6 characters",
      },
    };
    errors.hasError = true;
  }
  if (formData.password === "") {
    errors = {
      ...errors,
      password: { required: true, message: "Password is required" },
    };
    errors.hasError = true;
  }
  if (formData.confirmPassword === "") {
    errors = {
      ...errors,
      confirmPassword: {
        required: true,
        message: "Confirm Password is required",
      },
    };
    errors.hasError = true;
  }

  // Password validation
  const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
  const uppercaseChars = /[A-Z]/;
  const numberChars = /\d/; // \d for [0-9]

  if (
    !formData.password.match(specialChars) ||
    !formData.password.match(uppercaseChars) ||
    !formData.password.match(numberChars)
  ) {
    errors = {
      ...errors,
      password: {
        required: true,
        message:
          "Password must contain at least one special character, one uppercase letter, and one number",
      },
    };
    errors.hasError = true;
  }

  return errors;
};

export default Validation;
