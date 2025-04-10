export const validateAccountForm = (formData) => {
  let isValid = true;
  const errors = {};

  if (!formData.firstName) {
    errors.firstName = "First name is required";
    isValid = false;
  }

  if (!formData.lastName) {
    errors.lastName = "Last name is required";
    isValid = false;
  }

  if (!formData.email) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Invalid email format";
    isValid = false;
  }

  if (!formData.phone) {
    errors.phone = "Phone number is required";
    isValid = false;
  } else if (formData.phone.length < 10) {
    errors.phone = "Invalid phone number";
    isValid = false;
  }

  if (!formData.password) {
    errors.password = "Password is required";
    isValid = false;
  } else if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
    isValid = false;
  } else if (!/(?=.*[a-z])/.test(formData.password)) {
    errors.password = "Password must contain at least one lowercase letter";
    isValid = false;
  } else if (!/(?=.*[A-Z])/.test(formData.password)) {
    errors.password = "Password must contain at least one uppercase letter";
    isValid = false;
  } else if (!/(?=.*[0-9])/.test(formData.password)) {
    errors.password = "Password must contain at least one digit";
    isValid = false;
  } else if (!/(?=.*[!@#$%^&*])/.test(formData.password)) {
    errors.password = "Password must contain at least one special character";
    isValid = false;
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
    isValid = false;
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
    isValid = false;
  }

  return { isValid, errors };
};
