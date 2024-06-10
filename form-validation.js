const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("blur", (e) => {
    const input = e.target;

    if (!input.validity.valid || input.validity.valueMissing) {
      showError(input);
      input.addEventListener("input", (e) => inputEventValidity(e));
    } else {
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
  div.textContent = "";
  if (!input["required"] && input.value.length === 0) {
    input.classList.remove("valid");
    input.classList.remove("invalid");
    return;
  }

  input.classList.remove("invalid");
  input.classList.add("valid");
}

function showError(input) {
  const div = document.getElementById(
    `${input.getAttribute("aria-labelledby")}`
  );
  const error = input.validationMessage;

  // test
  // create a switch here
  switch (input.name) {
    case "fname":
      checkNameValidity(input, div);
      break;
    case "lname":
      console.log("here");
      checkLastNameValidity(input, div);
      break;
    case "email":
      checkEmailValidity(input, div);
      break;
  }
  // test

  // if (input.name === "phone") {
  //   div.textContent = `${error} example(US based number: 123-456-7890)`;
  // } else {
  //   div.textContent = error;
  // }

  if (input.name === "pwd" && !input.validity.valueMissing) {
    div.textContent =
      "Password should use at least one UpperCase, LowerCase and Number, and be of 8-16 characters length";
  }

  if (!input["required"] && input.value === "undefined") {
    return;
  }

  input.classList.remove("valid");
  input.classList.add("invalid");
}

function inputEventValidity(e) {
  const elem = e.target;

  if (!elem.validity.valid || elem.validity.valueMissing) {
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
