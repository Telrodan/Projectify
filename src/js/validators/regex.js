export const validateUsername = username => /^[a-zA-Z0-9]{5,}$/.test(username);
export const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const validatePhoneNumber = phoneNumber =>
  /^(\+\d{2}\s)?\d{7}$/.test(phoneNumber);
export const validatePassword = password =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
