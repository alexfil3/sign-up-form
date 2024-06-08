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

  if (input.name === "phone") {
    div.textContent = `${error} example(US based number: 123-456-7890)`;
  } else {
    div.textContent = error;
  }

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
