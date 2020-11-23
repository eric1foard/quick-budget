// *********************************************************************************
// helpers.js - This file is used for reusable methods, imported by other src files.
// *********************************************************************************

// Packages
import { isEmail } from "validator";
import Swal from 'sweetalert2'; // Using this SweetAlert package as well because it's easier to use in functions, requires less state management



// ====================================
// REUSABLE MODALS ====================
// ====================================

// Displays a modal notifying user they have signed up successfully
export const successfulSignUpAlert = async () => {
  await Swal.fire({
    icon: 'success',
    title: 'Success!',
    html: 'You are now registered!<br><br>Redirecting you to your dashboard...',
    showConfirmButton: false,
    timer: 1500
  });
}

// Displays a modal notifying user they have saved their info successfully
export const successfulSaveAlert = async () => {
  const message = Swal.fire({
    icon: 'success',
    title: 'Success!',
    html: 'Your information has been saved!',
    showCancelButton: true,
    cancelButtonText: 'Continue editing budget',
    confirmButtonText: 'Go to dashboard to see updated results',
  });

  let result = await message;
  return result;
}

// Displays a general error modal, used to display API call errors to user
export const errorAlert = (error) => {
  const resMessage =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message ||
    error.toString();

  return Swal.fire({
    icon: 'warning',
    title: 'Oops!',
    text: `${resMessage} Please try again.`, 
    footer: 'Or, if you have not yet signed up, please do so.'
  });
}


// ====================================
// USER AUTHORIZATION =================
// ====================================


// Validates SignUp information
// Returns: 1) Validation success/failure, and 2) Corresponding modal alert to display
export const verifySignUp = (username, email, password) => {
  let status = null;
  let alert = null;

  if (!username || !email || !password) {
    status = false;
    alert = Swal.fire({
      icon: 'warning',
      title: 'Oops!',
      text: 'Please fill out all forms.',
    });
  } else if (username.length < 3 || username.length > 20) {
    status = false;
    alert = Swal.fire({
      icon: 'warning',
      title: 'Oops!',
      text: 'Username must be between 3 and 20 characters long.',
    });
  } else if (isEmail(email) === false) {
    status = false;
    alert = Swal.fire({
      icon: 'warning',
      title: 'Oops!',
      text: 'Please enter a valid email address.',
    });
  } else if (password.length < 6 || password.length > 40) {
    status = false;
    alert = Swal.fire({
      icon: 'warning',
      title: 'Oops!',
      text: 'Password must be between 6 and 40 characters long.',
    });
  } else {
    status = true;
    alert =  successfulSignUpAlert();
  }
  return [alert, status]
};


// Validates LogIn information
// Returns: 1) Validation success/failure, and 2) Corresponding modal alert to display
export const verifyLogin = (username, password) => {
  let status = null; // Boolean, true if user input is valid, false if not
  let alert = null; // Holds the modal that will display to user

  if (!username || !password) {
    status = false;
    alert = Swal.fire({
      icon: 'warning',
      title: 'Oops!',
      text: 'Please enter a username and password.',
    });
  } else {
    status = true;
    alert = Swal.fire({
      icon: 'success',
      title: 'Success!',
      html: 'You are now logged in!<br><br>Redirecting you to your dashboard...',
      showConfirmButton: false,
      timer: 1500
    });
  }
  return [alert, status]
};
