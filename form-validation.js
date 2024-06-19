const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("blur", (e) => {
    const input = e.target;
    const firstPwd = document.querySelector('[name="pwd"]');

    if (!input.validity.valid || input.validity.valueMissing) {
      showError(input);
      input.addEventListener("input", (e) => inputEventValidity(e));
    } else {
      if (input.name === "confirm-pwd" && input.value !== firstPwd.value) {
        showError(input);
        input.addEventListener("input", (e) => inputEventValidity(e));
        return;
      }
      showSuccess(input);
      input.addEventListener("input", (e) => inputEventValidity(e));
    }
  });
}

form.addEventListener("submit", (e) => {
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];

    if (input.value.length === 0 && input["required"]) {
      e.preventDefault();
      showError(input);
    } else {
      showSuccess(input);
    }

    input.addEventListener("input", (e) => inputEventValidity(e));
  }
});

function showSuccess(input) {
  const div = document.getElementById(
    `${input.getAttribute("aria-labelledby")}`
  );
  const iconInvalid = document.querySelector(
    `[name="${input.name}"] ~ .icon-invalid`
  );
  const iconValid = document.querySelector(
    `[name="${input.name}"] ~ .icon-valid`
  );

  div.textContent = "";
  if (!input["required"] && input.value.length === 0) {
    input.classList.remove("valid");
    input.classList.remove("invalid");
    iconValid.classList.remove("icon-show");
    iconInvalid.classList.remove("icon-show");
    return;
  }

  input.classList.remove("invalid");
  input.classList.add("valid");
  iconValid.classList.add("icon-show");
  iconInvalid.classList.remove("icon-show");
}

function showError(input) {
  const div = document.getElementById(
    `${input.getAttribute("aria-labelledby")}`
  );
  const iconInvalid = document.querySelector(
    `[name="${input.name}"] ~ .icon-invalid`
  );
  const iconValid = document.querySelector(
    `[name="${input.name}"] ~ .icon-valid`
  );

  if (!input["required"] && input.value === "undefined") {
    return;
  }

  switch (input.name) {
    case "fname":
      checkNameValidity(input, div);
      break;
    case "lname":
      checkLastNameValidity(input, div);
      break;
    case "email":
      checkEmailValidity(input, div);
      break;
    case "phone":
      checkPhoneValidity(input, div);
      break;
    case "pwd":
      checkPwdValidity(input, div);
      break;
    case "confirm-pwd":
      checkConfirmPwdValidity(input, div);
      break;
    default:
      return;
  }
  input.classList.remove("valid");
  input.classList.add("invalid");
  iconValid.classList.remove("icon-show");
  iconInvalid.classList.add("icon-show");
}

function inputEventValidity(e) {
  const elem = e.target;
  const firstPwd = document.querySelector('[name="pwd"]');

  if (!elem.validity.valid || elem.validity.valueMissing) {
    showError(elem);
  } else if (elem.name === "confirm-pwd" && elem.value !== firstPwd.value) {
    showError(elem);
  } else {
    showSuccess(elem);
  }
}

function checkNameValidity(input, div) {
  const value = input.validity;

  if (value.patternMismatch) {
    div.textContent = "Your name should consist only of English letters";
    return;
  }

  if (value.tooShort) {
    div.textContent =
      "The name should be at least 2 letters. Now the length is 1 letter";
    return;
  }

  if (value.valueMissing) {
    div.textContent = "Fill in this field";
    return;
  }
}

function checkLastNameValidity(input, div) {
  const value = input.validity;

  if (value.patternMismatch) {
    div.textContent = "Your last name should consist only of English letters";
    return;
  }

  if (value.tooShort) {
    div.textContent =
      "The last name should be at least 2 letters. Now the length is 1 letter";
    return;
  }

  if (value.valueMissing) {
    div.textContent = "Fill in this field";
    return;
  }
}

function checkEmailValidity(input, div) {
  const value = input.validity;

  if (value.valueMissing) {
    div.textContent = "Fill in this field";
    return;
  }

  if (!value.validity) {
    div.textContent =
      "Please, use valid email address (example: john_doe@gmail.com)";
    return;
  }
}

function checkPhoneValidity(input, div) {
  const value = input.validity;

  if (value.patternMismatch) {
    div.textContent =
      "Your Phone Number should be in the format of: 123-456-7890";
    return;
  }
}

function checkPwdValidity(input, div) {
  const value = input.validity;

  if (value.tooShort) {
    div.textContent = "The password should be at least 8 characters long";
    return;
  }

  if (value.patternMismatch) {
    div.textContent =
      "Password should use at least one UpperCase, LowerCase and Number";
    return;
  }

  if (value.valueMissing) {
    div.textContent = "Fill in this field";
    return;
  }
}

function checkConfirmPwdValidity(input, div) {
  const firstPwd = document.querySelector('[name="pwd"]');
  const value = input.validity;

  if (value.tooShort) {
    div.textContent = "The password should be at least 8 characters long";
    return;
  }

  if (value.patternMismatch) {
    div.textContent =
      "Password should use at least one UpperCase, LowerCase and Number";
    return;
  }

  if (value.valueMissing) {
    div.textContent = "Fill in this field";
    return;
  }

  if (firstPwd.value !== input.value) {
    div.textContent = "Your confirm password should be equal to the password";
    return;
  }
}
