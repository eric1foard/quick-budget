import { isEmail } from "validator";
import Swal from 'sweetalert2';

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
    alert =  Swal.fire({
      icon: 'success',
      title: 'Success!',
      html: 'You are now registered!<br><br>Redirecting you to your dashboard...',
      showConfirmButton: false,
      timer: 1500
    })
  }
  return [alert, status]
};
