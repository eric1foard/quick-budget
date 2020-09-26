import { isEmail } from "validator";

export const validateUsername = username => {
  return (username.length < 3 || username.length > 20) ? false : true;
};

export const validateEmail = email => {
  if (!isEmail(email)) return false
};

export const validatePassword = password => {
  if (password.length < 6 || password.length > 40) return false;
};