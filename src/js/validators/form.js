import {
  validateUsername,
  validateEmail,
  validatePhoneNumber,
  validatePassword,
} from './regex.js';

// This function is called on every blur event
// this keyword will give the right input when blur event is fired
export function validateFormInput() {
  // get input message element
  const errorMessage = this.previousElementSibling;
  // input DOM manipulation helpers
  const validInput = () => {
    errorMessage.style.display = 'none';
    this.classList.add('form__input--valid');
    this.classList.remove('form__input--invalid');
  };
  const invalidInput = () => {
    errorMessage.style.display = 'block';
    this.classList.add('form__input--invalid');
    this.classList.remove('form__input--valid');
  };
  const defaultInput = () => {
    errorMessage.style.display = 'none';
    this.classList.remove('form__input--valid', 'form__input--invalid');
  };
  //Find the right input name
  if (this.value !== '') {
    switch (this.name) {
      case 'username':
        if (validateUsername(this.value)) {
          validInput();
        } else {
          invalidInput();
        }
        break;
      case 'email':
        if (validateEmail(this.value)) {
          validInput();
        } else {
          invalidInput();
        }
        break;
      case 'phoneNumber':
        if (validatePhoneNumber(this.value)) {
          validInput();
        } else {
          invalidInput();
        }
        break;
      case 'password':
        if (validatePassword(this.value)) {
          validInput();
        } else {
          invalidInput();
        }
        break;
      case 'confirmPassword':
        // get password input value so can confirm password
        const password =
          this.parentElement.previousElementSibling.childNodes[3].value;
        if (this.value === password) {
          validInput();
        } else {
          invalidInput();
        }
        break;
    }
  } else {
    defaultInput();
  }
}

// Validate register inputs by classname for registration
export function validateRegisterForm() {
  let counter = 0;
  // Get all inputs and filter classnames to find register inputs
  const formInputs = document.querySelectorAll('.form__input');
  formInputs.forEach(input => {
    if (
      input.classList.contains('form__input--valid') &&
      input.classList.contains('register__input')
    ) {
      counter++;
      console.log(counter);
    } else {
    }
  });
  // If all 5 input are contains the specified classnames return true otherwise false
  if (counter === 5) {
    return true;
  } else {
    return false;
  }
}

export function formMessageManager(formEl, validInvalidDefault, message = '') {
  const form = formEl;
  const isMessage = validInvalidDefault;
  const messageEl = form.childNodes[3];

  if (isMessage === 'valid') {
    messageEl.classList.add('form__message--valid');
    messageEl.innerText = message;
  } else if (isMessage === 'invalid') {
    messageEl.classList.add('form__message--invalid');
    messageEl.innerText = message;
  } else if (isMessage === 'default') {
    messageEl.classList.remove(
      'form__message--valid',
      'form__message--invalid'
    );
  }
}
