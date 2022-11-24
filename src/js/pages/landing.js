'use strict';

import { getUserDatabase, saveNewUser, verifyUser } from '../API/user.js';
import navigateUser from '../routing/navigate.js';
import {
  formMessageManager,
  validateFormInput,
  validateRegisterForm,
} from '../validators/form.js';

const toggleOverflowButtons = document.querySelectorAll('.toggle-overflow');
const forms = document.querySelectorAll('form');
const formInputs = document.querySelectorAll('.form__input');

// Register the event listeners
const registerEventListeners = () => {
  toggleOverflowButtons.forEach(button =>
    button.addEventListener('click', () =>
      document.body.classList.toggle('overflow-hidden')
    )
  );
  formInputs.forEach(input =>
    input.addEventListener('blur', validateFormInput)
  );
  forms.forEach(form => form.addEventListener('submit', formSubmitHandler));
};

// Handle form submit by form id
function formSubmitHandler(e) {
  e.preventDefault();
  const self = this;
  const formName = this.id;
  if (formName === 'registerForm') {
    registerNewUser(self, validateRegisterForm);
  } else if (formName === 'loginForm') {
    loginUser(self);
  }
}

// Login user on matching details
// and save user id in localstorage and verify user
async function loginUser(self) {
  const form = self;
  const userDatabase = await getUserDatabase();
  const user = userDatabase.find(
    user =>
      form.email.value === user.email && form.password.value === user.password
  );
  if (user) {
    verifyUser(user);
    navigateUser('/src/pages/home/home.html', 1750);
    formMessageManager(form, 'valid', 'Succesfull login');
  } else {
    formMessageManager(form, 'invalid', 'Invalid login details');
    setInterval(() => {
      formMessageManager(form, 'default');
    }, 2000);
  }
}

// Registering new user on valid inputs
async function registerNewUser(self, func) {
  if (func()) {
    const form = self;
    const user = {
      id: uuidv4(),
      username: form.username.value,
      email: form.email.value,
      phone_number: form.phoneNumber.value,
      password: form.password.value,
      subscribed: form.subscribe.checked,
    };
    await saveNewUser(user);
    // Display succesfull registration message
    document.getElementById('registerFormMessage').style.display = 'block';
    navigateUser('/index.html#loginPopup', 1750);
  }
}

registerEventListeners();
